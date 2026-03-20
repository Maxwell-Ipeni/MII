import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto & { tenantId: string }) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        passwordHash: dto.password,
        role: dto.role,
        tenantId: dto.tenantId,
      },
    });
  }

  async findAll(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findById(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id, tenantId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string, tenantId: string) {
    return this.prisma.user.findUnique({
      where: { email_tenantId: { email, tenantId } },
    });
  }

  async update(id: string, tenantId: string, dto: UpdateUserDto) {
    await this.findById(id, tenantId);
    return this.prisma.user.update({
      where: { id },
      data: {
        ...(dto.email && { email: dto.email }),
        ...(dto.name && { name: dto.name }),
        ...(dto.password && { passwordHash: dto.password }),
        ...(dto.role && { role: dto.role }),
      },
    });
  }

  async delete(id: string, tenantId: string) {
    await this.findById(id, tenantId);
    return this.prisma.user.delete({ where: { id } });
  }
}
