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
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  create(@Body() dto: CreateUserDto & { tenantId: string }) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users for a tenant' })
  @ApiQuery({ name: 'tenantId', type: String })
  findAll(@Query('tenantId', ParseUUIDPipe) tenantId: string) {
    return this.usersService.findAll(tenantId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiQuery({ name: 'tenantId', type: String })
  findById(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.usersService.findById(id, tenantId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiQuery({ name: 'tenantId', type: String })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, tenantId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiQuery({ name: 'tenantId', type: String })
  delete(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('tenantId', ParseUUIDPipe) tenantId: string,
  ) {
    return this.usersService.delete(id, tenantId);
  }
}
