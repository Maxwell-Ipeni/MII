import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ContactDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsString()
  @MaxLength(255)
  email: string;

  @ApiProperty({ example: 'I would like to inquire about your services' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  message: string;
}
