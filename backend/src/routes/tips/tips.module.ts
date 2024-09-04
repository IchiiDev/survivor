import { Module } from '@nestjs/common';
import { TipsController } from './tips.controller';

@Module({
  imports: [],
  controllers: [TipsController],
  providers: [],
})
export class TipsModule {}
