import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateNotificationDto } from './dto/notification.dto';
import { NotificationStatus } from '../../database/enums';

export interface NotificationDoc {
  id: string;
  type: string;
  channel: string;
  recipient: string;
  subject: string | null;
  body: string;
  status: NotificationStatus;
  sentAt: Date | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class NotificationsService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateNotificationDto) {
    return this.convex.mutation<NotificationDoc>('notifications:create', {
      type: dto.type,
      channel: dto.channel,
      recipient: dto.recipient,
      subject: dto.subject,
      body: dto.body,
      metadata: dto.metadata,
    });
  }

  async findAll() {
    return this.convex.query<NotificationDoc[]>('notifications:findAll', {});
  }

  async findById(id: string) {
    const notification = await this.convex.query<NotificationDoc | null>('notifications:findById', { id });
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async updateStatus(id: string, status: NotificationStatus) {
    await this.findById(id);
    return this.convex.mutation<NotificationDoc>('notifications:updateStatus', { id, status });
  }

  async markAsSent(id: string) {
    await this.findById(id);
    return this.convex.mutation<NotificationDoc>('notifications:markAsSent', { id });
  }
}
