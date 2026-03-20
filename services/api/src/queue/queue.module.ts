import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppQueueService } from './queues/app.queue';
import { NotificationsProcessor } from './processors/notifications.processor';
import { PaymentsProcessor } from './processors/payments.processor';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST') || 'localhost',
          port: parseInt(configService.get('REDIS_PORT') || '6379'),
        },
      }),
    }),
    BullModule.registerQueue(
      { name: 'notifications' },
      { name: 'payments' },
      { name: 'webhooks' },
    ),
  ],
  providers: [AppQueueService, NotificationsProcessor, PaymentsProcessor],
  exports: [AppQueueService, BullModule],
})
export class QueueModule {}
