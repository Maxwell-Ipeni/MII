import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTenantDto) {
    return this.prisma.tenant.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        description: dto.description,
        logo: dto.logo,
        primaryColor: dto.primaryColor || '#3B82F6',
        secondaryColor: dto.secondaryColor || '#22C55E',
      },
    });
  }

  async findAll() {
    return this.prisma.tenant.findMany({
      include: {
        _count: {
          select: { users: true, products: true },
        },
      },
    });
  }

  async findById(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        users: { select: { id: true, email: true, name: true, role: true } },
        products: true,
      },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async findBySlug(slug: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
    });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async update(id: string, dto: UpdateTenantDto) {
    return this.prisma.tenant.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string) {
    return this.prisma.tenant.delete({ where: { id } });
  }
}
