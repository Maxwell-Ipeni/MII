import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConvexService implements OnModuleInit, OnModuleDestroy {
  private convexUrl: string;
  private adminKey: string;
  private client: unknown = null;

  constructor(private configService: ConfigService) {
    this.convexUrl = this.configService.get<string>('CONVEX_DEPLOYMENT_URL') || '';
    this.adminKey = this.configService.get<string>('CONVEX_ADMIN_KEY') || '';
  }

  async onModuleInit() {
    try {
      const clientModule = await import('convex/browser');
      const ConvexClient = clientModule.ConvexClient;
      if (ConvexClient) {
        this.client = new ConvexClient(this.convexUrl);
      }
    } catch (error) {
      console.warn('Convex client not available. Please install convex package:', error);
    }
  }

  async onModuleDestroy() {
    if (this.client && typeof (this.client as { close?: () => void }).close === 'function') {
      (this.client as { close: () => void }).close();
    }
  }

  getClient() {
    return this.client;
  }

  async query<T = unknown>(queryName: string, args?: Record<string, unknown>): Promise<T> {
    if (!this.client) {
      throw new Error('Convex client not initialized');
    }
    const client = this.client as { query: (name: string, args?: Record<string, unknown>) => Promise<unknown> };
    return client.query(queryName, args) as Promise<T>;
  }

  async mutation<T = unknown>(mutationName: string, args?: Record<string, unknown>): Promise<T> {
    if (!this.client) {
      throw new Error('Convex client not initialized');
    }
    const client = this.client as { mutation: (name: string, args?: Record<string, unknown>) => Promise<unknown> };
    return client.mutation(mutationName, args) as Promise<T>;
  }
}
