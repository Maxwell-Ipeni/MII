import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface WhatsAppMessage {
  to: string;
  templateName: string;
  language?: string;
  components?: Array<{
    type: string;
    parameters: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

export interface WhatsAppResponse {
  messagingProduct: string;
  to: string;
  type: string;
  template?: {
    name: string;
    language: { code: string };
    components?: unknown[];
  };
}

@Injectable()
export class WhatsAppService {
  private readonly logger = new Logger(WhatsAppService.name);
  private readonly phoneNumberId: string;
  private readonly accessToken: string;
  private readonly businessAccountId: string;

  constructor(private configService: ConfigService) {
    this.phoneNumberId = this.configService.get('WHATSAPP_PHONE_NUMBER_ID') || '';
    this.accessToken = this.configService.get('WHATSAPP_ACCESS_TOKEN') || '';
    this.businessAccountId = this.configService.get('WHATSAPP_BUSINESS_ACCOUNT_ID') || '';
  }

  async sendMessage(message: WhatsAppMessage): Promise<WhatsAppResponse> {
    this.logger.log(`Sending WhatsApp message to ${message.to} with template ${message.templateName}`);
    
    return {
      messagingProduct: 'whatsapp',
      to: message.to,
      type: 'template',
      template: {
        name: message.templateName,
        language: { code: message.language || 'en_US' },
        components: message.components,
      },
    };
  }

  async sendTextMessage(to: string, body: string): Promise<WhatsAppResponse> {
    this.logger.log(`Sending text WhatsApp message to ${to}`);
    
    return {
      messagingProduct: 'whatsapp',
      to,
      type: 'text',
    };
  }

  async markAsRead(messageId: string): Promise<void> {
    this.logger.log(`Marking WhatsApp message ${messageId} as read`);
  }
}
