import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Document, ImagesService } from './images.service';
import { Request } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(private imagesService: ImagesService) {}

  @Get()
  async getDocuments(@Req() req: Request): Promise<Document[]> {
    return await this.imagesService.getDocuments(req.user.id);
  }

  @Post()
  async createDocument(
    @Body() body: { uuid: string; filename: string; shared_with: string },
    @Req() req: Request,
  ): Promise<{
    uuid: string;
    filename: string;
    shared_with: string;
    owner_id: string;
  }> {
    return this.imagesService.createDocument(
      body.uuid,
      body.filename,
      String(req.user.id),
      body.shared_with,
    );
  }
}
