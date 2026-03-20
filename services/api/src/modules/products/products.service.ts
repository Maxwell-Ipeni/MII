import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto & { tenantId: string }) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        features: dto.features,
        tenantId: dto.tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.product.findMany({
      where: { tenantId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        features: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string, tenantId: string) {
    const product = await this.prisma.product.findFirst({
      where: { id, tenantId },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        features: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, tenantId: string, dto: UpdateProductDto) {
    await this.findById(id, tenantId);
    return this.prisma.product.update({
      where: { id },
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
    return this.prisma.product.delete({ where: { id } });
  }
}
