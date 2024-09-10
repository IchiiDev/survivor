import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { DocumentsController } from './documents.controller';

@Module({
  imports: [],
  controllers: [ImagesController, DocumentsController],
  providers: [ImagesService],
})
export class ImagesModule {}
