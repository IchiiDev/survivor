import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tips')
@ApiTags('tips')
export class TipsController {
  @Get()
  getAllTips(): string {
    return 'This action returns all tips';
  }

  @Post()
  createTip(): string {
    return 'This action creates a new tip';
  }
}
