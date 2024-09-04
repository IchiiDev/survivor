import { Module } from '@nestjs/common';
import { EncountersController } from './encounters.controller';

@Module({
  imports: [],
  controllers: [EncountersController],
  providers: [],
})
export class EncountersModule {}
