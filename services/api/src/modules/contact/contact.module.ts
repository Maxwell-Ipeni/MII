import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { SmsModule } from '../sms/sms.module';

@Module({
  imports: [ConfigModule, SmsModule],
  controllers: [ContactController],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
