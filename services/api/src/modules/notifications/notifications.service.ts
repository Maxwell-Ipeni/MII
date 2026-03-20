import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateNotificationDto } from './dto/notification.dto';
import { NotificationStatus, Prisma } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        type: dto.type,
        channel: dto.channel,
        recipient: dto.recipient,
        subject: dto.subject,
        body: dto.body,
        metadata: dto.metadata as Prisma.InputJsonValue | undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.notification.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification) throw new NotFoundException('Notification not found');
    return notification;
  }

  async updateStatus(id: string, status: NotificationStatus) {
    await this.findById(id);
    return this.prisma.notification.update({
      where: { id },
      data: { status },
    });
  }

  async markAsSent(id: string) {
    await this.findById(id);
    return this.prisma.notification.update({
      where: { id },
      data: {
        status: 'SENT' as NotificationStatus,
        sentAt: new Date(),
      },
    });
  }
}
