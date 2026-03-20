import { Controller, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SmsService } from './sms.service';

class SendSmsDto {
  phoneNumber: string;
  message: string;
}

class PaymentReminderDto {
  phoneNumber: string;
  customerName: string;
  amount: number;
  dueDate: string;
}

class BulkReminderDto {
  tenantId: string;
}

@ApiTags('SMS')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a single SMS' })
  @ApiResponse({ status: 200, description: 'SMS sent' })
  sendSms(@Body() dto: SendSmsDto) {
    return this.smsService.sendSms(dto.phoneNumber, dto.message);
  }

  @Post('reminder')
  @ApiOperation({ summary: 'Send payment reminder' })
  @ApiResponse({ status: 200, description: 'Reminder sent' })
  sendReminder(@Body() dto: PaymentReminderDto) {
    return this.smsService.sendPaymentReminder(dto.phoneNumber, dto.customerName, dto.amount, dto.dueDate);
  }

  @Post('confirmation')
  @ApiOperation({ summary: 'Send payment confirmation' })
  @ApiResponse({ status: 200, description: 'Confirmation sent' })
  sendConfirmation(
    @Body() dto: { phoneNumber: string; customerName: string; amount: number; transactionId: string },
  ) {
    return this.smsService.sendPaymentConfirmation(dto.phoneNumber, dto.customerName, dto.amount, dto.transactionId);
  }

  @Post('bulk-reminders')
  @ApiOperation({ summary: 'Send bulk payment reminders to overdue invoices' })
  @ApiResponse({ status: 200, description: 'Bulk reminders sent' })
  sendBulkReminders(@Body() dto: BulkReminderDto) {
    return this.smsService.sendBulkReminders(dto.tenantId);
  }
}
