import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateTenantDto, UpdateTenantDto } from './dto/tenant.dto';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  primaryColor: string;
  secondaryColor: string;
  createdAt: Date;
  updatedAt: Date;
  users?: { id: string; email: string; name: string; role: string }[];
  products?: unknown[];
  _count?: { users: number; products: number };
}

@Injectable()
export class TenantsService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateTenantDto) {
    return this.convex.mutation<Tenant>('tenants:create', {
      name: dto.name,
      slug: dto.slug,
      description: dto.description,
      logo: dto.logo,
      primaryColor: dto.primaryColor || '#3B82F6',
      secondaryColor: dto.secondaryColor || '#22C55E',
    });
  }

  async findAll() {
    return this.convex.query<Tenant[]>('tenants:findAll', {});
  }

  async findById(id: string) {
    const tenant = await this.convex.query<Tenant | null>('tenants:findById', { id });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async findBySlug(slug: string) {
    const tenant = await this.convex.query<Tenant | null>('tenants:findBySlug', { slug });
    if (!tenant) throw new NotFoundException('Tenant not found');
    return tenant;
  }

  async update(id: string, dto: UpdateTenantDto) {
    return this.convex.mutation<Tenant>('tenants:update', { id, data: dto });
  }

  async delete(id: string) {
    return this.convex.mutation('tenants:delete', { id });
  }
}
