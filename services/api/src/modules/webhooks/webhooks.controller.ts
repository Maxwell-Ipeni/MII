import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto, UpdateWebhookDto } from './dto/webhook.dto';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new webhook' })
  @ApiResponse({ status: 201, description: 'Webhook created' })
  create(@Body() dto: CreateWebhookDto & { tenantId: string }) {
    return this.webhooksService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all webhooks for a tenant' })
  @ApiQuery({ name: 'tenantId', type: String })
  findAll(@Query('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.webhooksService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get webhook by ID' })
  @ApiQuery({ name: 'tenantId', type: String })
  findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.webhooksService.findById(id, tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update webhook' })
  @ApiQuery({ name: 'tenantId', type: String })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
    @Body() dto: UpdateWebhookDto,
  ) {
    return this.webhooksService.update(id, tenantId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete webhook' })
  @ApiQuery({ name: 'tenantId', type: String })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.webhooksService.delete(id, tenantId);
  }
}
