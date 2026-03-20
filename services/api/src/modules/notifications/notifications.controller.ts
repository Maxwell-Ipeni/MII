import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/notification.dto';
import { NotificationStatus } from '../../database/enums';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new notification' })
  @ApiResponse({ status: 201, description: 'Notification created' })
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notifications' })
  @ApiResponse({ status: 200, description: 'List of notifications' })
  findAll() {
    return this.notificationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification by ID' })
  @ApiResponse({ status: 200, description: 'Notification found' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.findById(id);
  }

  @Post(':id/status')
  @ApiOperation({ summary: 'Update notification status' })
  @ApiResponse({ status: 200, description: 'Status updated' })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('status') status: NotificationStatus,
  ) {
    return this.notificationsService.updateStatus(id, status);
  }

  @Post(':id/mark-as-sent')
  @ApiOperation({ summary: 'Mark notification as sent' })
  @ApiResponse({ status: 200, description: 'Notification marked as sent' })
  markAsSent(@Param('id', ParseUUIDPipe) id: string) {
    return this.notificationsService.markAsSent(id);
  }
}
