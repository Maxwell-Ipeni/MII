import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send a contact message' })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  async sendMessage(@Body() dto: ContactDto) {
    return this.contactService.sendMessage(dto);
  }
}
