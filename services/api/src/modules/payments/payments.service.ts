import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreatePaymentDto, PaymentStatus } from './dto/payment.dto';

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string;
  transactionId: string | null;
  mpesaReceiptId: string | null;
  phoneNumber: string | null;
  metadata: Record<string, unknown> | null;
  productId: string | null;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class PaymentsService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreatePaymentDto & { tenantId: string }) {
    return this.convex.mutation<Payment>('payments:create', {
      amount: dto.amount,
      currency: dto.currency,
      paymentMethod: dto.paymentMethod,
      productId: dto.productId,
      phoneNumber: dto.phoneNumber,
      status: PaymentStatus.PENDING,
      tenantId: dto.tenantId,
    });
  }

  async findAll(tenantId: string) {
    return this.convex.query<Payment[]>('payments:findAll', { tenantId });
  }

  async findById(id: string, tenantId: string) {
    const payment = await this.convex.query<Payment | null>('payments:findById', { id, tenantId });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async updateStatus(id: string, tenantId: string, status: PaymentStatus) {
    await this.findById(id, tenantId);
    return this.convex.mutation<Payment>('payments:updateStatus', { id, status });
  }

  async findByTransactionId(transactionId: string) {
    const payment = await this.convex.query<Payment | null>('payments:findByTransactionId', { transactionId });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }
}
