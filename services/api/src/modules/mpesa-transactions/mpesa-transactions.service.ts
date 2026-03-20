import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateMpesaTransactionDto, MpesaTransactionStatus, MatchType } from './dto/mpesa-transaction.dto';

export interface MpesaTransaction {
  id: string;
  transactionId: string;
  transactionDate: Date;
  phoneNumber: string;
  amount: number;
  reference: string | null;
  accountNumber: string | null;
  transactionType: string | null;
  status: MpesaTransactionStatus;
  matchType: MatchType | null;
  invoiceId: string | null;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalRevenue: number;
  matchedAmount: number;
  unmatchedAmount: number;
  totalTransactions: number;
  matchedCount: number;
  unmatchedCount: number;
  dailySummary: { date: string; amount: number; count: number }[];
}

@Injectable()
export class MpesaTransactionsService {
  constructor(private convex: ConvexService) {}

  async uploadTransactions(tenantId: string, transactions: CreateMpesaTransactionDto[]) {
    return this.convex.mutation<MpesaTransaction[]>('mpesa:uploadTransactions', {
      tenantId,
      transactions: transactions.map(t => ({
        ...t,
        status: MpesaTransactionStatus.PENDING,
      })),
    });
  }

  async findAll(tenantId: string, filters?: { status?: MpesaTransactionStatus; startDate?: string; endDate?: string; phoneNumber?: string }) {
    return this.convex.query<MpesaTransaction[]>('mpesa:findAll', { tenantId, filters });
  }

  async findById(id: string, tenantId: string) {
    const transaction = await this.convex.query<MpesaTransaction | null>('mpesa:findById', { id, tenantId });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async findUnmatched(tenantId: string) {
    return this.convex.query<MpesaTransaction[]>('mpesa:findUnmatched', { tenantId });
  }

  async matchTransaction(transactionId: string, invoiceId: string, matchType: MatchType, tenantId: string) {
    return this.convex.mutation<MpesaTransaction>('mpesa:matchTransaction', {
      transactionId,
      invoiceId,
      matchType,
      tenantId,
    });
  }

  async unmatchTransaction(transactionId: string, tenantId: string) {
    return this.convex.mutation<MpesaTransaction>('mpesa:unmatchTransaction', {
      transactionId,
      tenantId,
    });
  }

  async getDashboardStats(tenantId: string) {
    return this.convex.query<DashboardStats>('mpesa:getDashboardStats', { tenantId });
  }

  async autoMatch(tenantId: string) {
    return this.convex.mutation<{ matched: number; unmatched: number }>('mpesa:autoMatch', { tenantId });
  }
}
