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
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto, CourierQuoteDto, AssignCourierDto, UpdateDeliveryStatusDto, DeliveryQueryDto } from './dto/delivery.dto';

@ApiTags('Deliveries')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Get('couriers')
  @ApiOperation({ summary: 'Get available couriers' })
  @ApiResponse({ status: 200, description: 'List of couriers' })
  getCouriers() {
    return this.deliveriesService.getCouriers();
  }

  @Post('quotes')
  @ApiOperation({ summary: 'Get courier quotes' })
  @ApiResponse({ status: 200, description: 'List of quotes' })
  getQuotes(@Body() dto: CourierQuoteDto) {
    return this.deliveriesService.getCourierQuotes(dto.pickupAddress, dto.deliveryAddress, dto.packageDetails);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new delivery' })
  @ApiResponse({ status: 201, description: 'Delivery created' })
  create(@Body() dto: CreateDeliveryDto) {
    return this.deliveriesService.createDelivery(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deliveries' })
  @ApiResponse({ status: 200, description: 'List of deliveries' })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query('status') status?: string,
    @Query('recipientPhone') recipientPhone?: string,
    @Query('courierId') courierId?: string,
  ) {
    return this.deliveriesService.findAll(tenantId, {
      status: status as any,
      recipientPhone,
      courierId,
    });
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get delivery statistics' })
  @ApiResponse({ status: 200, description: 'Delivery statistics' })
  getStats(@Query('tenantId') tenantId: string) {
    return this.deliveriesService.getStats(tenantId);
  }

  @Get('track/:trackingNumber')
  @ApiOperation({ summary: 'Track a delivery by tracking number' })
  @ApiResponse({ status: 200, description: 'Delivery tracking info' })
  @ApiResponse({ status: 404, description: 'Delivery not found' })
  track(
    @Param('trackingNumber') trackingNumber: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.deliveriesService.trackDelivery(trackingNumber, tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get delivery by ID' })
  @ApiResponse({ status: 200, description: 'Delivery found' })
  @ApiResponse({ status: 404, description: 'Delivery not found' })
  findById(@Param('id', ParseUUIDPipe) id: string, @Query('tenantId') tenantId: string) {
    return this.deliveriesService.findById(id, tenantId);
  }

  @Post('assign')
  @ApiOperation({ summary: 'Assign courier to delivery' })
  @ApiResponse({ status: 200, description: 'Courier assigned' })
  assignCourier(@Body() dto: AssignCourierDto) {
    return this.deliveriesService.assignCourier(dto.deliveryId, dto.courierId, dto.tenantId);
  }

  @Put(':id/status')
  @ApiOperation({ summary: 'Update delivery status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId') tenantId: string,
    @Body() dto: UpdateDeliveryStatusDto,
  ) {
    return this.deliveriesService.updateStatus(id, tenantId, dto.status, dto.notes, dto.location);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel delivery' })
  @ApiResponse({ status: 200, description: 'Delivery cancelled' })
  cancelDelivery(@Param('id', ParseUUIDPipe) id: string, @Query('tenantId') tenantId: string) {
    return this.deliveriesService.cancelDelivery(id, tenantId);
  }
}
