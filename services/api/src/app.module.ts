import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
  ],
})
export class AppModule {}
