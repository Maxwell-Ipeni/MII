import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceStatus } from './dto/invoice.dto';

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  paidAmount: number;
  dueDate: Date | null;
  description: string | null;
  status: InvoiceStatus;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class InvoicesService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateInvoiceDto) {
    return this.convex.mutation<Invoice>('invoices:create', {
      invoiceNumber: dto.invoiceNumber,
      customerName: dto.customerName,
      customerPhone: dto.customerPhone,
      amount: dto.amount,
      paidAmount: dto.paidAmount || 0,
      dueDate: dto.dueDate,
      description: dto.description,
      status: InvoiceStatus.PENDING,
      tenantId: dto.tenantId,
    });
  }

  async findAll(tenantId: string, filters?: { status?: InvoiceStatus; customerPhone?: string; startDate?: string; endDate?: string }) {
    return this.convex.query<Invoice[]>('invoices:findAll', { tenantId, filters });
  }

  async findById(id: string, tenantId: string) {
    const invoice = await this.convex.query<Invoice | null>('invoices:findById', { id, tenantId });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async findByNumber(invoiceNumber: string, tenantId: string) {
    return this.convex.query<Invoice | null>('invoices:findByNumber', { invoiceNumber, tenantId });
  }

  async findByPhone(customerPhone: string, tenantId: string) {
    return this.convex.query<Invoice[]>('invoices:findByPhone', { customerPhone, tenantId });
  }

  async findPending(tenantId: string) {
    return this.convex.query<Invoice[]>('invoices:findPending', { tenantId });
  }

  async update(id: string, tenantId: string, dto: UpdateInvoiceDto) {
    await this.findById(id, tenantId);
    return this.convex.mutation<Invoice>('invoices:update', {
      id,
      data: dto,
      tenantId,
    });
  }

  async recordPayment(id: string, amount: number, tenantId: string) {
    const invoice = await this.findById(id, tenantId);
    const newPaidAmount = invoice.paidAmount + amount;
    let status = invoice.status;
    
    if (newPaidAmount >= invoice.amount) {
      status = InvoiceStatus.PAID;
    } else if (newPaidAmount > 0) {
      status = InvoiceStatus.PARTIAL;
    }

    return this.convex.mutation<Invoice>('invoices:recordPayment', {
      id,
      paidAmount: newPaidAmount,
      status,
      tenantId,
    });
  }

  async delete(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.convex.mutation('invoices:delete', { id, tenantId });
  }
}
