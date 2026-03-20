import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('notifications')
export class NotificationsProcessor {
  private readonly logger = new Logger(NotificationsProcessor.name);

  @Process()
  async handleNotification(job: Job) {
    this.logger.log(`Processing notification job ${job.id}`);
    
    const { type, payload } = job.data;
    
    switch (type) {
      case 'SEND_SMS':
        await this.sendSms(payload);
        break;
      case 'SEND_EMAIL':
        await this.sendEmail(payload);
        break;
      case 'SEND_WHATSAPP':
        await this.sendWhatsApp(payload);
        break;
      default:
        this.logger.warn(`Unknown notification type: ${type}`);
    }
  }

  private async sendSms(payload: Record<string, unknown>) {
    this.logger.log(`Sending SMS to ${payload.recipient}: ${payload.message}`);
  }

  private async sendEmail(payload: Record<string, unknown>) {
    this.logger.log(`Sending email to ${payload.recipient}: ${payload.subject}`);
  }

  private async sendWhatsApp(payload: Record<string, unknown>) {
    this.logger.log(`Sending WhatsApp to ${payload.recipient}: ${payload.message}`);
  }
}
