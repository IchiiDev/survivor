import { Body, Controller, Delete, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EncountersService } from './encounters.service';

@Controller('encounters')
@ApiTags('encounters')
export class EncountersController {
    constructor(private readonly encountersService: EncountersService) { }

    @Get()
    async getAllEncounters(): Promise<{
        id: string,
        customer_id: string,
        date: string,
        rating: string,
        comment: string,
        source: string
    }[]> {
        const result = await this.encountersService.getAllEncounters();

        if (!result) {
            throw new HttpException("No encounters found", 404);
        }
        return result;
    }

    @Post()
    async createEncounter(@Body() data: {
        customer_id: string,
        date: string,
        rating: string,
        comment: string,
        source: string
    }): Promise<string> {
        const { customer_id, date, rating, comment, source } = data;
        if (!customer_id || !date || !rating || !comment || !source)
            throw new HttpException("Required parameters not given", 422);
        return this.encountersService.createEncounter(
            customer_id,
            date,
            rating,
            comment,
            source
        );
    }

    @Get(':id')
    async getEncounter(@Param('id') id: string): Promise<{
        customer_id: string,
        date: string,
        rating: string,
        comment: string,
        source: string,
    }> {
        const result = this.encountersService.getEncounter(id);

        if (!result) {
            throw new HttpException("Encounter not found", 404);
        }
        return result;
    }

    @Put(':id')
    async updateEncounter(
        @Param('id') id: string,
        @Body() data: {
            customer_id?: string,
            date?: string,
            rating?: string,
            comment?: string,
            source?: string
        }
    ): Promise<{
        id: string,
        customer_id: string,
        date: string,
        rating: string,
        comment: string,
        source: string,
    }> {
        const { customer_id, date, rating, comment, source } = data;
        const result = this.encountersService.updateEncounter(id, customer_id, date, rating, comment, source);

        if (!result) {
            throw new HttpException("Encounter not found", 404);
        }
        return result;
    }

    @Delete(':id')
    deleteEncounter(@Param('id') id: string): Promise<string> {
        const result = this.encountersService.deleteEncounter(id);

        if (!result) {
            throw new HttpException("Encounter not found", 404);
        }
        return result;
    }
}