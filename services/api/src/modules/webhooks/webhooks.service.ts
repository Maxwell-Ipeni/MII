import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';

export interface Webhook {
  id: string;
  url: string;
  event: string;
  secret: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

@Injectable()
export class WebhooksService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateWebhookDto & { tenantId: string }) {
    return this.convex.mutation<Webhook>('webhooks:create', {
      url: dto.url,
      event: dto.event,
      secret: dto.secret,
      isActive: dto.isActive,
      tenantId: dto.tenantId,
    });
  }

  async findAll(tenantId: string) {
    return this.convex.query<Webhook[]>('webhooks:findAll', { tenantId });
  }

  async findById(id: string, tenantId: string) {
    const webhook = await this.convex.query<Webhook | null>('webhooks:findById', { id, tenantId });
    if (!webhook) throw new NotFoundException('Webhook not found');
    return webhook;
  }

  async update(id: string, tenantId: string, dto: UpdateWebhookDto) {
    await this.findById(id, tenantId);
    return this.convex.mutation<Webhook>('webhooks:update', {
      id,
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
    return this.convex.mutation('webhooks:delete', { id });
  }
}
