import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncountersService } from './encounters.service';

@Controller('encounters')
@ApiTags('encounters')
export class EncountersController {
    constructor(private readonly encountersService: EncountersService) { }

    @Get()
    getAllEncounters(): string {
        return this.encountersService.getAllEncounters();
    }

    @Post()
    createEncounter(): string {
        return this.encountersService.createEncounter();
    }

    @Get(':id')
    getEncounter(@Param('id') id: string): string {
        return this.encountersService.getEncounter(+id);
    }

    @Put(':id')
    updateEncounter(@Param('id') id: string): string {
        return this.encountersService.updateEncounter(+id);
    }

    @Delete(':id')
    deleteEncounter(@Param('id') id: string): string {
        return this.encountersService.deleteEncounter(+id);
    }
}
