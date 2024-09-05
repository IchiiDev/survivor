import { Module } from '@nestjs/common';
import { EncountersController } from './encounters.controller';
import { EncountersService } from './encounters.service';

@Module({
    imports: [],
    controllers: [EncountersController],
    providers: [EncountersService],
})
export class EncountersModule { }
