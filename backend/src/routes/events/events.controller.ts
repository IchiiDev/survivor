import { Body, Controller, Get, HttpException, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { max } from 'rxjs';

@Controller('events')
@ApiTags('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    async getAllEvents(): Promise<{
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    }[]> {
        const result = this.eventsService.getAllEvents();

        if (!result) {
            throw new HttpException("No events found", 404);
        }
        return result;
    }

    @Post()
    async createEvent(
        @Body() data: {
            name: string,
            date: string,
            max_participants: string,
            location: string,
            type: string,
            employee_id: string,
            location_name: string
        }): Promise<string> {
        const { name, date, max_participants, location, type, employee_id, location_name } = data;
        if (!name || !date || !max_participants || !location || !type || !employee_id || !location_name)
            throw new HttpException("Required parameters not given", 422);
        return this.eventsService.createEvent(
            name,
            date,
            max_participants,
            location,
            type,
            employee_id,
            location_name
        );
    }

    @Get(':id')
    async getEvent(@Param('id') id: string): Promise<{
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    }> {
        const result = this.eventsService.getEvent(id);

        if (!result) {
            throw new HttpException("Event not found", 404);
        }
        return result;
    }

    @Put(':id')
    async updateEvent(
        @Param('id') id: string,
        @Body() data: {
            name?: string,
            date?: string,
            max_participants?: string,
            location?: string,
            type?: string,
            employee_id?: string,
            location_name?: string
        }
    ): Promise<{
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    }> {
        const { name, date, max_participants, location, type, employee_id, location_name } = data;
        const result = this.eventsService.updateEvent(id, name, date, max_participants, location, type, employee_id, location_name);

        if (!result) {
            throw new HttpException("Event not found", 404);
        }
        return result;
    }
}