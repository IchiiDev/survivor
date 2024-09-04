import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TipsService } from './tips.service';

@Controller('tips')
@ApiTags('tips')
export class TipsController {
    constructor(private readonly tipsService: TipsService) { }
    @Get()
    getAllTips(): string {
        return this.tipsService.getAllTips();
    }

    @Post()
    createTip(): string {
        return this.tipsService.createTip();
    }
}

