import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { MpesaTransactionsModule } from './modules/mpesa-transactions/mpesa-transactions.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { SmsModule } from './modules/sms/sms.module';
import { OrdersModule } from './modules/orders/orders.module';
import { WhatsAppModule } from './modules/whatsapp/whatsapp.module';
import { ConvexModule } from './database/convex/convex.module';
import { ContactModule } from './modules/contact/contact.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot([{
      name: 'short',
      ttl: 1000,
      limit: 3,
    }, {
      name: 'medium',
      ttl: 10000,
      limit: 20,
    }]),
    AuthModule,
    ConvexModule,
    TenantsModule,
    UsersModule,
    ProductsModule,
    PaymentsModule,
    NotificationsModule,
    WebhooksModule,
    MpesaTransactionsModule,
    InvoicesModule,
    SmsModule,
    OrdersModule,
    WhatsAppModule,
    ContactModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
