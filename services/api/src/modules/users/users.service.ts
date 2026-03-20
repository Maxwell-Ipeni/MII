import { Injectable, NotFoundException } from '@nestjs/common';
import { ConvexService } from '../../database/convex/convex.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRole } from '../../database/enums';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  tenantId: string;
}

@Injectable()
export class UsersService {
  constructor(private convex: ConvexService) {}

  async create(dto: CreateUserDto & { tenantId: string }) {
    return this.convex.mutation<User>('users:create', {
      email: dto.email,
      name: dto.name,
      password: dto.password,
      role: dto.role,
      tenantId: dto.tenantId,
    });
  }

  async findAll(tenantId: string) {
    return this.convex.query<User[]>('users:findAll', { tenantId });
  }

  async findById(id: string, tenantId: string) {
    const user = await this.convex.query<User | null>('users:findById', { id, tenantId });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string, tenantId: string) {
    return this.convex.query<User | null>('users:findByEmail', { email, tenantId });
  }

  async update(id: string, tenantId: string, dto: UpdateUserDto) {
    await this.findById(id, tenantId);
    return this.convex.mutation<User>('users:update', {
      id,
      data: {
        ...(dto.email && { email: dto.email }),
        ...(dto.name && { name: dto.name }),
        ...(dto.password && { password: dto.password }),
        ...(dto.role && { role: dto.role }),
      },
    });
  }

  async delete(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.convex.mutation('users:delete', { id });
  }
}
