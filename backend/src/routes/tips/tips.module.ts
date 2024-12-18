import { Module } from '@nestjs/common';
import { TipsController } from './tips.controller';
import { TipsService } from './tips.service';

@Module({
  imports: [],
  controllers: [TipsController],
  providers: [TipsService],
})
export class TipsModule {}
