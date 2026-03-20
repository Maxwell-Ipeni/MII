import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWebhookDto & { tenantId: string }) {
    return this.prisma.webhook.create({
      data: {
        url: dto.url,
        event: dto.event,
        secret: dto.secret,
        isActive: dto.isActive,
        tenantId: dto.tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.webhook.findMany({
      where: { tenantId },
    });
  }

  async findById(id: string, tenantId: string) {
    const webhook = await this.prisma.webhook.findFirst({
      where: { id, tenantId },
    });
    if (!webhook) throw new NotFoundException('Webhook not found');
    return webhook;
  }

  async update(id: string, tenantId: string, dto: UpdateWebhookDto) {
    await this.findById(id, tenantId);
    return this.prisma.webhook.update({
      where: { id },
      data: {
        ...(dto.url && { url: dto.url }),
        ...(dto.event && { event: dto.event }),
        ...(dto.secret && { secret: dto.secret }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
      },
    });
  }

  async delete(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.webhook.delete({ where: { id } });
  }
}
