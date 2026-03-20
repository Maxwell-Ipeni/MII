import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateOrderDto, OrderStatus, PaymentStatus, OrderItem } from './dto/order.dto';

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string | null;
  notes: string | null;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentReference: string | null;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  deliveredOrders: number;
  totalRevenue: number;
  paidOrders: number;
  unpaidOrders: number;
}

@Injectable()
export class OrdersService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateOrderDto) {
    const totalAmount = dto.items.reduce((sum, item) => sum + item.totalPrice, 0);
    
    return this.convex.mutation<Order>('orders:create', {
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      items: dto.items,
      totalAmount,
      deliveryAddress: dto.deliveryAddress,
      notes: dto.notes,
      status: OrderStatus.PENDING,
      paymentStatus: PaymentStatus.UNPAID,
      tenantId: dto.tenantId,
    });
  }

  async findAll(tenantId: string, filters?: { status?: OrderStatus; paymentStatus?: PaymentStatus; customerPhone?: string }) {
    return this.convex.query<Order[]>('orders:findAll', { tenantId, filters });
  }

  async findById(id: string, tenantId: string) {
    const order = await this.convex.query<Order | null>('orders:findById', { id, tenantId });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async findByPhone(customerPhone: string, tenantId: string) {
    return this.convex.query<Order[]>('orders:findByPhone', { customerPhone, tenantId });
  }

  async updateStatus(id: string, tenantId: string, status: OrderStatus) {
    await this.findById(id, tenantId);
    return this.convex.mutation<Order>('orders:updateStatus', { id, status, tenantId });
  }

  async updatePaymentStatus(id: string, tenantId: string, paymentStatus: PaymentStatus, paymentReference?: string) {
    await this.findById(id, tenantId);
    return this.convex.mutation<Order>('orders:updatePaymentStatus', {
      id,
      paymentStatus,
      paymentReference,
      tenantId,
    });
  }

  async getStats(tenantId: string) {
    return this.convex.query<OrderStats>('orders:getStats', { tenantId });
  }

  async cancelOrder(id: string, tenantId: string) {
    return this.updateStatus(id, tenantId, OrderStatus.CANCELLED);
  }
}
