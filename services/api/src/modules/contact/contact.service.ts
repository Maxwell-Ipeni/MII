import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ContactDto } from './dto/contact.dto';
import { SmsService } from '../sms/sms.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly businessPhone: string;
  private readonly contactEmail: string;

  constructor(
    private configService: ConfigService,
    private smsService: SmsService,
  ) {
    this.businessPhone = this.configService.get('BUSINESS_PHONE') || '+254768610735';
    this.contactEmail = this.configService.get('CONTACT_EMAIL') || 'maxwelipeni1@gmail.com';
  }

  async sendMessage(dto: ContactDto): Promise<{ success: boolean; message: string }> {
    this.logger.log(`New contact message from ${dto.email}: ${dto.name}`);
    this.logger.log(`Message: ${dto.message}`);

    const notificationMessage = `🔔 New Contact Form\n\nName: ${dto.name}\nEmail: ${dto.email}\nMessage: ${dto.message.substring(0, 100)}${dto.message.length > 100 ? '...' : ''}`;

    try {
      const smsResult = await this.smsService.sendSms(this.businessPhone, notificationMessage);
      
      if (smsResult.success) {
        this.logger.log(`Notification SMS sent successfully. MessageId: ${smsResult.messageId}`);
      } else {
        this.logger.warn(`Failed to send notification SMS: ${smsResult.error}`);
      }
    } catch (error) {
      this.logger.error(`Error sending notification SMS: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
    };
  }
}
