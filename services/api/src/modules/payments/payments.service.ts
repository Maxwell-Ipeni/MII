import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreatePaymentDto, PaymentStatus } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePaymentDto & { tenantId: string }) {
    return this.prisma.payment.create({
      data: {
        amount: dto.amount,
        currency: dto.currency,
        paymentMethod: dto.paymentMethod,
        productId: dto.productId,
        phoneNumber: dto.phoneNumber,
        status: PaymentStatus.PENDING,
        tenantId: dto.tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.payment.findMany({
      where: { tenantId },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        paymentMethod: true,
        transactionId: true,
        mpesaReceiptId: true,
        phoneNumber: true,
        productId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string, tenantId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { id, tenantId },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        paymentMethod: true,
        transactionId: true,
        mpesaReceiptId: true,
        phoneNumber: true,
        metadata: true,
        productId: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async updateStatus(id: string, tenantId: string, status: PaymentStatus) {
    await this.findById(id, tenantId);
    return this.prisma.payment.update({
      where: { id },
      data: { status },
    });
  }

  async findByTransactionId(transactionId: string) {
    const payment = await this.prisma.payment.findFirst({
      where: { transactionId },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        paymentMethod: true,
        transactionId: true,
        mpesaReceiptId: true,
        phoneNumber: true,
        metadata: true,
        productId: true,
        tenantId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }
}
