import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface MpesaStkPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDesc: string;
}

export interface MpesaCallback {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}

@Injectable()
export class MpesaService {
  private readonly logger = new Logger(MpesaService.name);
  private readonly consumerKey: string;
  private readonly consumerSecret: string;
  private readonly shortCode: string;
  private readonly passkey: string;
  private readonly callbackUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor(private configService: ConfigService) {
    this.consumerKey = this.configService.get('MPESA_CONSUMER_KEY') || '';
    this.consumerSecret = this.configService.get('MPESA_CONSUMER_SECRET') || '';
    this.shortCode = this.configService.get('MPESA_SHORT_CODE') || '';
    this.passkey = this.configService.get('MPESA_PASSKEY') || '';
    this.callbackUrl = this.configService.get('MPESA_CALLBACK_URL') || '';
  }

  async getAccessToken(): Promise<string> {
    if (this.accessToken && this.tokenExpiry && new Date() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64');
    
    this.logger.log('Fetching M-Pesa access token');
    
    this.accessToken = 'mock_token';
    this.tokenExpiry = new Date(Date.now() + 3000000);
    
    return this.accessToken;
  }

  async initiateStkPush(request: MpesaStkPushRequest): Promise<{ checkoutRequestId: string }> {
    const token = await this.getAccessToken();
    
    this.logger.log(`Initiating STK push for ${request.phoneNumber}, amount: ${request.amount}`);
    
    return {
      checkoutRequestId: `mock_checkout_${Date.now()}`,
    };
  }

  handleCallback(callback: MpesaCallback): { success: boolean; data?: Record<string, unknown> } {
    const { ResultCode, CallbackMetadata } = callback.Body.stkCallback;
    
    if (ResultCode === 0 && CallbackMetadata) {
      const data: Record<string, unknown> = {};
      
      for (const item of CallbackMetadata.Item) {
        data[item.Name] = item.Value;
      }
      
      return { success: true, data };
    }
    
    return { success: false };
  }

  generatePassword(): string {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14);
    const str = `${this.shortCode}${this.passkey}${timestamp}`;
    return Buffer.from(str).toString('base64');
  }
}
