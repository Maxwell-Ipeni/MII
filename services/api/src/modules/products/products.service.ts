import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

@Injectable()
export class ProductsService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateProductDto & { tenantId: string }) {
    return this.convex.mutation<Product>('products:create', {
      name: dto.name,
      description: dto.description,
      price: dto.price,
      features: dto.features,
      tenantId: dto.tenantId,
    });
  }

  async findAll(tenantId: string) {
    return this.convex.query<Product[]>('products:findAll', { tenantId });
  }

  async findById(id: string, tenantId: string) {
    const product = await this.convex.query<Product | null>('products:findById', { id, tenantId });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, tenantId: string, dto: UpdateProductDto) {
    await this.findById(id, tenantId);
    return this.convex.mutation<Product>('products:update', {
      id,
      data: {
        ...(dto.name && { name: dto.name }),
        ...(dto.description && { description: dto.description }),
        ...(dto.price !== undefined && { price: dto.price }),
        ...(dto.features && { features: dto.features }),
      },
    });
  }

  async delete(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.convex.mutation('products:delete', { id });
  }
}
