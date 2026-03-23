import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WhatsAppService } from './whatsapp.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

class WebhookPayload {
  object: string;
  entry: any[];
}

class SendMessageDto {
  phoneNumber: string;
  message: string;
}

@ApiTags('WhatsApp')
@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  @Get('webhook')
  @ApiOperation({ summary: 'Verify WhatsApp webhook' })
  @ApiResponse({ status: 200, description: 'Webhook verification' })
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') token: string,
  ) {
    const verifyToken = this.whatsappService.getVerifyToken();
    
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    
    return { error: 'Verification failed' };
  }

  @Post('webhook')
  @ApiOperation({ summary: 'Receive WhatsApp messages' })
  @ApiResponse({ status: 200, description: 'Message received' })
  handleWebhook(
    @Body() payload: WebhookPayload,
    @Query('tenantId') tenantId: string,
  ) {
    if (payload.object !== 'whatsapp_business_account') {
      return { status: 'ignored' };
    }

    for (const entry of payload.entry || []) {
      for (const change of entry.changes || []) {
        const messages = change.value?.messages || [];
        
        for (const message of messages) {
          const phone = message.from;
          let content = '';

          if (message.type === 'text') {
            content = message.text?.body || '';
          } else if (message.type === 'image') {
            content = '[Image]';
          } else if (message.type === 'audio') {
            content = '[Audio]';
          }

          if (content) {
            this.whatsappService.handleIncomingMessage(phone, content, tenantId || 'default');
          }
        }
      }
    }

    return { status: 'ok' };
  }

  @Post('send')
  @ApiOperation({ summary: 'Send a WhatsApp message' })
  @ApiResponse({ status: 200, description: 'Message sent' })
  @UseGuards(JwtAuthGuard)
  sendMessage(@Body() dto: SendMessageDto) {
    return this.whatsappService.sendMessage(dto.phoneNumber, dto.message);
  }
}
