import { Controller, Get } from '@nestjs/common';
import { Document, ImagesService } from './images.service';

@Controller('documents')
export class DocumentsController {
  constructor(private imagesService: ImagesService) {}

  @Get()
  async getDocuments(): Promise<Document[]> {
    return await this.imagesService.getDocuments();
  }
}
