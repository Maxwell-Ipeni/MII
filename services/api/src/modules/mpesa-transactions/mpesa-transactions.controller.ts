import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MpesaTransactionsService } from './mpesa-transactions.service';
import { UploadMpesaCsvDto, MatchTransactionDto, MpesaTransactionQueryDto, MatchType } from './dto/mpesa-transaction.dto';

@ApiTags('M-Pesa Transactions')
@Controller('mpesa')
export class MpesaTransactionsController {
  constructor(private readonly mpesaService: MpesaTransactionsService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload M-Pesa CSV transactions' })
  @ApiResponse({ status: 201, description: 'Transactions uploaded successfully' })
  uploadTransactions(@Body() dto: UploadMpesaCsvDto) {
    return this.mpesaService.uploadTransactions(dto.tenantId, dto.transactions);
  }

  @Get()
  @ApiOperation({ summary: 'Get all M-Pesa transactions' })
  @ApiResponse({ status: 200, description: 'List of transactions' })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query('status') status?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('phoneNumber') phoneNumber?: string,
  ) {
    return this.mpesaService.findAll(tenantId, { status: status as any, startDate, endDate, phoneNumber });
  }

  @Get('unmatched')
  @ApiOperation({ summary: 'Get unmatched transactions' })
  @ApiResponse({ status: 200, description: 'List of unmatched transactions' })
  findUnmatched(@Query('tenantId') tenantId: string) {
    return this.mpesaService.findUnmatched(tenantId);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  @ApiResponse({ status: 200, description: 'Dashboard statistics' })
  getDashboardStats(@Query('tenantId') tenantId: string) {
    return this.mpesaService.getDashboardStats(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiResponse({ status: 200, description: 'Transaction found' })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  findById(@Param('id', ParseUUIDPipe) id: string, @Query('tenantId') tenantId: string) {
    return this.mpesaService.findById(id, tenantId);
  }

  @Post('match')
  @ApiOperation({ summary: 'Manually match transaction to invoice' })
  @ApiResponse({ status: 200, description: 'Transaction matched' })
  matchTransaction(@Body() dto: MatchTransactionDto & { tenantId: string }) {
    return this.mpesaService.matchTransaction(dto.transactionId, dto.invoiceId, dto.matchType, dto.tenantId);
  }

  @Post('unmatch/:id')
  @ApiOperation({ summary: 'Unmatch transaction' })
  @ApiResponse({ status: 200, description: 'Transaction unmatched' })
  unmatchTransaction(@Param('id', ParseUUIDPipe) id: string, @Query('tenantId') tenantId: string) {
    return this.mpesaService.unmatchTransaction(id, tenantId);
  }

  @Post('auto-match')
  @ApiOperation({ summary: 'Auto-match transactions to invoices' })
  @ApiResponse({ status: 200, description: 'Auto-match completed' })
  autoMatch(@Query('tenantId') tenantId: string) {
    return this.mpesaService.autoMatch(tenantId);
  }
}
