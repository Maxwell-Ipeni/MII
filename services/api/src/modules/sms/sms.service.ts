import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConvexService } from '../../database/convex/convex.service';

export interface SmsResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

@Injectable()
export class SmsService {
  private apiKey: string;
  private username: string;
  private senderId: string;

  constructor(
    private configService: ConfigService,
    private convex: ConvexService,
  ) {
    this.apiKey = this.configService.get<string>('AFRICASTALKING_API_KEY') || '';
    this.username = this.configService.get<string>('AFRICASTALKING_USERNAME') || 'sandbox';
    this.senderId = this.configService.get<string>('AFRICASTALKING_SENDER_ID') || '';
  }

  async sendSms(phoneNumber: string, message: string): Promise<SmsResult> {
    if (!this.apiKey) {
      console.warn('SMS API key not configured');
      return { success: false, error: 'SMS not configured' };
    }

    try {
      const response = await fetch('https://api.africastalking.com/version1/messaging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'ApiKey': this.apiKey,
        },
        body: new URLSearchParams({
          username: this.username,
          to: phoneNumber,
          message: message,
          from: this.senderId,
        }),
      });

      const data = await response.json();

      if (data.SMSMessageData?.Messages?.[0]?.status === 'Success') {
        return {
          success: true,
          messageId: data.SMSMessageData.Messages[0].messageId,
        };
      }

      return {
        success: false,
        error: data.SMSMessageData?.Message || 'Failed to send SMS',
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async sendPaymentReminder(phoneNumber: string, customerName: string, amount: number, dueDate: string) {
    const message = `Dear ${customerName}, this is a reminder that your payment of KES ${amount.toLocaleString()} is due on ${dueDate}. Please make payment to avoid late fees. Thank you.`;
    return this.sendSms(phoneNumber, message);
  }

  async sendPaymentConfirmation(phoneNumber: string, customerName: string, amount: number, transactionId: string) {
    const message = `Dear ${customerName}, we have received your payment of KES ${amount.toLocaleString()}. Transaction ID: ${transactionId}. Thank you for your payment.`;
    return this.sendSms(phoneNumber, message);
  }

  async sendOverdueNotice(phoneNumber: string, customerName: string, amount: number, daysOverdue: number) {
    const message = `Dear ${customerName}, your payment of KES ${amount.toLocaleString()} is ${daysOverdue} days overdue. Please settle your bill to avoid service interruption.`;
    return this.sendSms(phoneNumber, message);
  }

  async sendBulkReminders(tenantId: string) {
    const overdueInvoices = await this.convex.query<any[]>('invoices:getOverdue', { tenantId });
    
    const results = [];
    for (const invoice of overdueInvoices) {
      const result = await this.sendOverdueNotice(
        invoice.customerPhone,
        invoice.customerName,
        invoice.amount - invoice.paidAmount,
        Math.floor((Date.now() - new Date(invoice.dueDate).getTime()) / (1000 * 60 * 60 * 24)),
      );
      results.push({ invoiceId: invoice.id, ...result });
    }

    return results;
  }
}
