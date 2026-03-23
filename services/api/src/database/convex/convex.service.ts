import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConvexService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ConvexService.name);
  private convexUrl: string;
  private adminKey: string;
  private client: unknown = null;
  private isConnected = false;

  constructor(private configService: ConfigService) {
    this.convexUrl = this.configService.get<string>('CONVEX_DEPLOYMENT_URL') || '';
    this.adminKey = this.configService.get<string>('CONVEX_ADMIN_KEY') || '';
  }

  async onModuleInit() {
    if (!this.convexUrl) {
      this.logger.warn('Convex deployment URL not configured. Set CONVEX_DEPLOYMENT_URL in .env');
      return;
    }

    try {
      const clientModule = await import('convex/browser');
      const ConvexClient = clientModule.ConvexClient;
      if (ConvexClient) {
        this.client = new ConvexClient(this.convexUrl);
        this.isConnected = true;
        this.logger.log('Convex client initialized successfully');
      }
    } catch (error) {
      this.logger.error('Failed to initialize Convex client:', error);
    }
  }

  async onModuleDestroy() {
    if (this.client && typeof (this.client as { close?: () => void }).close === 'function') {
      (this.client as { close: () => void }).close();
    }
  }

  isConfigured(): boolean {
    return !!this.convexUrl && !!this.adminKey;
  }

  isHealthy(): boolean {
    return this.isConnected;
  }

  getClient() {
    if (!this.client) {
      throw new Error('Convex client not initialized. Ensure CONVEX_DEPLOYMENT_URL and CONVEX_ADMIN_KEY are set.');
    }
    return this.client;
  }

  async query<T = unknown>(queryName: string, args?: Record<string, unknown>): Promise<T> {
    if (!this.client) {
      throw new Error('Convex client not initialized. Ensure CONVEX_DEPLOYMENT_URL and CONVEX_ADMIN_KEY are set.');
    }
    const client = this.client as { query: (name: string, args?: Record<string, unknown>) => Promise<unknown> };
    return client.query(queryName, args) as Promise<T>;
  }

  async mutation<T = unknown>(mutationName: string, args?: Record<string, unknown>): Promise<T> {
    if (!this.client) {
      throw new Error('Convex client not initialized. Ensure CONVEX_DEPLOYMENT_URL and CONVEX_ADMIN_KEY are set.');
    }
    const client = this.client as { mutation: (name: string, args?: Record<string, unknown>) => Promise<unknown> };
    return client.mutation(mutationName, args) as Promise<T>;
  }
}
