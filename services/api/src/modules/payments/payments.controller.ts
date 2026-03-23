import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdateStatusDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Payments')
@Controller('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created' })
  create(@Body() dto: CreatePaymentDto & { tenantId: string }) {
    return this.paymentsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments for a tenant' })
  @ApiQuery({ name: 'tenantId', type: String })
  findAll(@Query('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.paymentsService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get payment by ID' })
  @ApiQuery({ name: 'tenantId', type: String })
  findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.paymentsService.findById(id, tenantId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update payment status' })
  @ApiQuery({ name: 'tenantId', type: String })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.paymentsService.updateStatus(id, tenantId, dto.status);
  }

  @Get('transaction/:transactionId')
  @ApiOperation({ summary: 'Get payment by transaction ID' })
  findByTransactionId(
    @Param('transactionId') transactionId: string,
  ) {
    return this.paymentsService.findByTransactionId(transactionId);
  }
}
