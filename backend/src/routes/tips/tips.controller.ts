import { Body, Controller, Get, HttpException, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TipsService } from './tips.service';

@Controller('tips')
@ApiTags('tips')
export class TipsController {
    constructor(private readonly tipsService: TipsService) { }
    @Get()
    async getAllTips(): Promise<{ id: number, title: string, tip: string }[]> {
        const result = await this.tipsService.getAllTips();

        if (!result) {
            throw new HttpException('No tips found', 404);
        }
        return result;
    }

    @Post()
    async createTip(@Body() data: { title: string, tip: string }) {
        const { title, tip } = data;
        if (!title || !tip)
            throw new HttpException("Required parameters not given", 422);
        return await this.tipsService.createTip(title, tip);
    }
}

