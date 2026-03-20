import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConvexService } from '../../database/convex/convex.service';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus, PaymentStatus, OrderItem } from '../orders/dto/order.dto';

export interface ParsedOrder {
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  deliveryAddress?: string;
  notes?: string;
}

export interface WhatsAppMessage {
  from: string;
  type: 'text' | 'image' | 'audio';
  content: string;
  timestamp: Date;
}

@Injectable()
export class WhatsAppService {
  private accessToken: string;
  private phoneNumberId: string;
  private businessAccountId: string;

  constructor(
    private configService: ConfigService,
    private convex: ConvexService,
    private ordersService: OrdersService,
  ) {
    this.accessToken = this.configService.get<string>('WHATSAPP_ACCESS_TOKEN') || '';
    this.phoneNumberId = this.configService.get<string>('WHATSAPP_PHONE_NUMBER_ID') || '';
    this.businessAccountId = this.configService.get<string>('WHATSAPP_BUSINESS_ACCOUNT_ID') || '';
  }

  getVerifyToken(): string {
    return this.configService.get<string>('WHATSAPP_WEBHOOK_VERIFY_TOKEN') || 'your_verify_token_here';
  }

  parseMessage(message: string): ParsedOrder {
    const normalized = message.toLowerCase().trim();
    const lines = message.split('\n').map(l => l.trim()).filter(Boolean);
    
    let customerName = 'Customer';
    let customerPhone = '';
    const items: OrderItem[] = [];
    let deliveryAddress = '';
    let notes = '';

    for (const line of lines) {
      const phoneMatch = line.match(/(\+?254|0)[7][0-9]{8}/);
      if (phoneMatch) {
        customerPhone = phoneMatch[0];
        continue;
      }

      if (line.toLowerCase().startsWith('name:')) {
        customerName = line.substring(5).trim();
        continue;
      }

      if (line.toLowerCase().startsWith('address:')) {
        deliveryAddress = line.substring(8).trim();
        continue;
      }

      if (line.toLowerCase().startsWith('note:')) {
        notes = line.substring(5).trim();
        continue;
      }

      const qtyMatch = line.match(/^(\d+)\s*(?:x|×)?\s*(.+)/i);
      if (qtyMatch) {
        const quantity = parseInt(qtyMatch[1], 10);
        const productName = qtyMatch[2].trim();
        const unitPrice = this.estimatePrice(productName);
        items.push({
          productId: '',
          productName,
          quantity,
          unitPrice,
          totalPrice: quantity * unitPrice,
        });
      }
    }

    if (items.length === 0 && lines.length > 0) {
      const defaultItem = message.substring(0, 100).trim();
      items.push({
        productId: '',
        productName: defaultItem,
        quantity: 1,
        unitPrice: this.estimatePrice(defaultItem),
        totalPrice: this.estimatePrice(defaultItem),
      });
    }

    return {
      customerName,
      customerPhone,
      items,
      deliveryAddress: deliveryAddress || undefined,
      notes: notes || undefined,
    };
  }

  private estimatePrice(productName: string): number {
    const name = productName.toLowerCase();
    if (name.includes('chicken') || name.includes('fried')) return 500;
    if (name.includes('beef') || name.includes('steak')) return 600;
    if (name.includes('fish') || name.includes('fish')) return 550;
    if (name.includes('rice') || name.includes('pilau')) return 200;
    if (name.includes('soda') || name.includes('drink')) return 100;
    if (name.includes('water')) return 50;
    return 300;
  }

  async handleIncomingMessage(phone: string, message: string, tenantId: string) {
    const normalizedMessage = message.toLowerCase().trim();

    if (normalizedMessage === 'order' || normalizedMessage === 'menu') {
      return this.sendMessage(phone, this.getMenuMessage());
    }

    if (normalizedMessage === 'help') {
      return this.sendMessage(phone, this.getHelpMessage());
    }

    if (normalizedMessage.startsWith('check') || normalizedMessage.includes('status')) {
      const orderNumber = message.replace(/check|status/i, '').trim();
      return this.sendOrderStatus(phone, orderNumber, tenantId);
    }

    try {
      const parsedOrder = this.parseMessage(message);
      
      if (parsedOrder.items.length === 0) {
        return this.sendMessage(phone, this.getHelpMessage());
      }

      const total = parsedOrder.items.reduce((sum, item) => sum + item.totalPrice, 0);
      
      const order = await this.ordersService.create({
        customerName: parsedOrder.customerName,
        customerPhone: phone,
        items: parsedOrder.items,
        deliveryAddress: parsedOrder.deliveryAddress,
        notes: parsedOrder.notes,
        tenantId,
      });

      const response = `Order Received! 🎉\n\n` +
        `Order #${order.id.slice(0, 8).toUpperCase()}\n` +
        `Items: ${parsedOrder.items.length}\n` +
        `Total: KES ${total.toLocaleString()}\n\n` +
        `We'll confirm shortly. Reply with "check ${order.id.slice(0, 8)}" to track.`;

      return this.sendMessage(phone, response);
    } catch (error) {
      return this.sendMessage(phone, "Sorry, we couldn't process your order. Please try again or type 'help' for assistance.");
    }
  }

  private getMenuMessage(): string {
    return `🍔 *OUR MENU* 🍔\n\n` +
      `• Chicken - KES 500\n` +
      `• Beef Steak - KES 600\n` +
      `• Fish - KES 550\n` +
      `• Pilau - KES 200\n` +
      `• Soda - KES 100\n` +
      `• Water - KES 50\n\n` +
      `To order, simply type:\n` +
      `2x Chicken\n` +
      `1x Pilau\n` +
      `+2547XXXXXXXX\n` +
      `Name: Your Name\n` +
      `Address: Delivery Address`;
  }

  private getHelpMessage(): string {
    return `*HOW TO ORDER* 📝\n\n` +
      `1. List your items (e.g., "2x Chicken")\n` +
      `2. Add your phone number\n` +
      `3. Add your name\n` +
      `4. Add delivery address (optional)\n\n` +
      `Example:\n` +
      `2x Chicken\n` +
      `1x Soda\n` +
      `+254712345678\n` +
      `Name: John\n` +
      `Address: Karen Road\n\n` +
      `Type "menu" to see our full menu.`;
  }

  private async sendOrderStatus(phone: string, orderNumber: string, tenantId: string) {
    try {
      const orders = await this.ordersService.findAll(tenantId);
      const order = orders.find(o => o.id.slice(0, 8).toUpperCase() === orderNumber.toUpperCase());
      
      if (!order) {
        return this.sendMessage(phone, `Order #${orderNumber} not found.`);
      }

      const statusEmoji = {
        PENDING: '⏳',
        CONFIRMED: '✅',
        PROCESSING: '👨‍🍳',
        SHIPPED: '🚚',
        DELIVERED: '🎉',
        CANCELLED: '❌',
      }[order.status];

      const paymentEmoji = order.paymentStatus === 'PAID' ? '💳 Paid' : '💰 Unpaid';

      return this.sendMessage(phone,
        `*Order #${order.id.slice(0, 8).toUpperCase()}*\n\n` +
        `Status: ${statusEmoji} ${order.status}\n` +
        `Payment: ${paymentEmoji}\n` +
        `Total: KES ${order.totalAmount.toLocaleString()}\n\n` +
        `Items: ${order.items.length}\n` +
        `Date: ${new Date(order.createdAt).toLocaleDateString()}`
      );
    } catch {
      return this.sendMessage(phone, `Order #${orderNumber} not found.`);
    }
  }

  async sendMessage(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
    if (!this.accessToken) {
      console.warn('WhatsApp access token not configured');
      return { success: false, error: 'WhatsApp not configured' };
    }

    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            to: to,
            type: 'text',
            text: { body: message },
          }),
        }
      );

      const data = await response.json();

      if (data.id) {
        return { success: true, messageId: data.id };
      }

      return { success: false, error: data.error?.message || 'Failed to send message' };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async sendOrderConfirmation(phone: string, orderId: string, totalAmount: number) {
    const message = `✅ *Order Confirmed!*\n\n` +
      `Order #${orderId.slice(0, 8).toUpperCase()}\n` +
      `Total: KES ${totalAmount.toLocaleString()}\n\n` +
      `We'll notify you when your order is ready!`;
    return this.sendMessage(phone, message);
  }

  async sendDeliveryNotification(phone: string, orderId: string) {
    const message = `🚚 *Order On The Way!*\n\n` +
      `Order #${orderId.slice(0, 8).toUpperCase()} is on its way to you.\n\n` +
      `Track your order by replying with "check ${orderId.slice(0, 8)}"`;
    return this.sendMessage(phone, message);
  }
}
