import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Get(':id')
  @ApiBearerAuth('Bearer')
  @ApiParam({
    name: 'id',
    description: 'UUID of the image',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Image found',
    schema: {
      type: 'file',
    },
  })
  async getImage(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const result = await this.imagesService.getImage(id);

    if (!result) {
      throw new HttpException('Not Found', 404);
      return;
    }

    res.setHeader('Content-Type', `image/${result.type}`);
    return new StreamableFile(result.content);
  }

  @Post()
  @ApiBearerAuth('Bearer')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'file',
          description: 'Image to upload',
        },
        scope: {
          type: 'string',
          description: 'Scope of the image',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Image created',
    schema: {
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
          description: 'UUID of the image',
        },
      },
    },
  })
  async createImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() body: { scope: string },
  ): Promise<{ uuid: string }> {
    if (!image || !body.scope) throw new HttpException('Bad Request', 400);

    const mimetype = image.mimetype.split('/')[1];
    if (mimetype !== 'jpeg' && mimetype !== 'png')
      throw new HttpException('Bad Request', 400);

    const uuid = await this.imagesService.createImage(
      image.buffer,
      body.scope,
      <'jpeg' | 'png'>image.mimetype.split('/')[1],
    );

    return { uuid };
  }
}
