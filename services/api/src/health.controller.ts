import { Controller, Get } from '@nestjs/common';
import { ConvexService } from './database/convex/convex.service';

@Controller('health')
export class HealthController {
  constructor(private readonly convexService: ConvexService) {}

  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      convex: {
        configured: this.convexService.isConfigured(),
        connected: this.convexService.isHealthy(),
      },
    };
  }
}
