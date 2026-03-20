import { Module } from '@nestjs/common';
import { MpesaTransactionsController } from './mpesa-transactions.controller';
import { MpesaTransactionsService } from './mpesa-transactions.service';

@Module({
  controllers: [MpesaTransactionsController],
  providers: [MpesaTransactionsService],
  exports: [MpesaTransactionsService],
})
export class MpesaTransactionsModule {}
