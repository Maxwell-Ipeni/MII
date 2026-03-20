import { IsString, IsNumber, IsOptional, IsEnum, IsArray, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum MpesaTransactionStatus {
  PENDING = 'PENDING',
  MATCHED = 'MATCHED',
  UNMATCHED = 'UNMATCHED',
  MANUAL_MATCHED = 'MANUAL_MATCHED',
}

export enum MatchType {
  AMOUNT = 'AMOUNT',
  PHONE = 'PHONE',
  REFERENCE = 'REFERENCE',
  MANUAL = 'MANUAL',
}

export class CreateMpesaTransactionDto {
  @ApiProperty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @IsDateString()
  transactionDate: string;

  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accountNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  transactionType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsString()
  tenantId: string;
}

export class UploadMpesaCsvDto {
  @ApiProperty()
  @IsString()
  tenantId: string;

  @ApiProperty({ type: [CreateMpesaTransactionDto] })
  @IsArray()
  transactions: CreateMpesaTransactionDto[];
}

export class MatchTransactionDto {
  @ApiProperty()
  @IsString()
  transactionId: string;

  @ApiProperty()
  @IsString()
  invoiceId: string;

  @ApiProperty({ enum: MatchType })
  @IsEnum(MatchType)
  matchType: MatchType;
}

export class MpesaTransactionQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  tenantId?: string;

  @ApiPropertyOptional({ enum: MpesaTransactionStatus })
  @IsOptional()
  @IsEnum(MpesaTransactionStatus)
  status?: MpesaTransactionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
