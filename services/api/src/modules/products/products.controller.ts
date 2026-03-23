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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created' })
  create(@Body() dto: CreateProductDto & { tenantId: string }) {
    return this.productsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for a tenant' })
  @ApiQuery({ name: 'tenantId', type: String })
  findAll(@Query('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.productsService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiQuery({ name: 'tenantId', type: String })
  findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.productsService.findById(id, tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiQuery({ name: 'tenantId', type: String })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, tenantId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiQuery({ name: 'tenantId', type: String })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.productsService.delete(id, tenantId);
  }
}
