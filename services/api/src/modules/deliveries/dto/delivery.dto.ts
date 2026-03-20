import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum DeliveryStatus {
  PENDING = 'PENDING',
  QUOTE_REQUESTED = 'QUOTE_REQUESTED',
  COURIER_ASSIGNED = 'COURIER_ASSIGNED',
  PICKED_UP = 'PICKED_UP',
  IN_TRANSIT = 'IN_TRANSIT',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum PackageSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'EXTRA_LARGE',
}

export interface DeliveryAddress {
  street: string;
  city: string;
  county: string;
  latitude?: number;
  longitude?: number;
}

export interface PackageDetails {
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  description: string;
  isFragile: boolean;
}

export class CreateDeliveryDto {
  @ApiProperty()
  @IsString()
  recipientName: string;

  @ApiProperty()
  @IsString()
  recipientPhone: string;

  @ApiProperty()
  pickupAddress: DeliveryAddress;

  @ApiProperty()
  deliveryAddress: DeliveryAddress;

  @ApiProperty()
  packageDetails: PackageDetails;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiProperty()
  @IsString()
  tenantId: string;
}

export class CourierQuoteDto {
  @ApiProperty()
  pickupAddress: DeliveryAddress;

  @ApiProperty()
  deliveryAddress: DeliveryAddress;

  @ApiProperty()
  packageDetails: PackageDetails;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;
}

export class AssignCourierDto {
  @ApiProperty()
  @IsString()
  deliveryId: string;

  @ApiProperty()
  @IsString()
  courierId: string;

  @ApiProperty()
  @IsString()
  tenantId: string;
}

export class UpdateDeliveryStatusDto {
  @ApiProperty({ enum: DeliveryStatus })
  @IsEnum(DeliveryStatus)
  status: DeliveryStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  location?: string;
}

export class DeliveryQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional({ enum: DeliveryStatus })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  status?: DeliveryStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  recipientPhone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  courierId?: string;
}
