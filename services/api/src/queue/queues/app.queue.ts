import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

export interface JobData {
  type: string;
  payload: Record<string, unknown>;
}

@Injectable()
export class AppQueueService {
  constructor(
    @InjectQueue('notifications') private notificationsQueue: Queue,
    @InjectQueue('payments') private paymentsQueue: Queue,
    @InjectQueue('webhooks') private webhooksQueue: Queue,
  ) {}

  async addNotificationJob(data: JobData) {
    return this.notificationsQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
    });
  }

  async addPaymentJob(data: JobData) {
    return this.paymentsQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000,
      },
    });
  }

  async addWebhookJob(data: JobData) {
    return this.webhooksQueue.add(data, {
      attempts: 3,
      backoff: {
        type: 'fixed',
        delay: 1000,
      },
    });
  }
}
