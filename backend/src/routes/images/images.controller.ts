import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getImage(@Param('id') id: string, @Res() res: Response): void {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createImage(@Res() res: Response): void {}
}
