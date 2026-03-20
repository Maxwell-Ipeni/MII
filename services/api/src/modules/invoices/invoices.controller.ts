import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto, UpdateInvoiceDto, InvoiceQueryDto } from './dto/invoice.dto';

@ApiTags('Invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new invoice' })
  @ApiResponse({ status: 201, description: 'Invoice created' })
  create(@Body() dto: CreateInvoiceDto) {
    return this.invoicesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all invoices' })
  @ApiResponse({ status: 200, description: 'List of invoices' })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query('status') status?: string,
    @Query('customerPhone') customerPhone?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.invoicesService.findAll(tenantId, { status: status as any, customerPhone, startDate, endDate });
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending invoices' })
  @ApiResponse({ status: 200, description: 'List of pending invoices' })
  findPending(@Query('tenantId') tenantId: string) {
    return this.invoicesService.findPending(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID' })
  @ApiResponse({ status: 200, description: 'Invoice found' })
  @ApiResponse({ status: 404, description: 'Invoice not found' })
  findById(@Param('id', ParseUUIDPipe) id: string, @Query('tenantId') tenantId: string) {
    return this.invoicesService.findById(id, tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update invoice' })
  @ApiResponse({ status: 200, description: 'Invoice updated' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId') tenantId: string,
    @Body() dto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.update(id, tenantId, dto);
  }

  @Post(':id/payment')
  @ApiOperation({ summary: 'Record payment for invoice' })
  @ApiResponse({ status: 200, description: 'Payment recorded' })
  recordPayment(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId') tenantId: string,
    @Body('amount') amount: number,
  ) {
    return this.invoicesService.recordPayment(id, amount, tenantId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete invoice' })
  @ApiResponse({ status: 200, description: 'Invoice deleted' })
  delete(@Param('id', ParseUUIDPipe) id: string, @Query('tenantId') tenantId: string) {
    return this.invoicesService.delete(id, tenantId);
  }
}
