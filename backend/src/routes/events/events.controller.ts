import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventsService } from './events.service';

@Controller('events')
@ApiTags('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    getAllEvents(): string {
        return this.eventsService.getAllEvents();
    }

    @Post()
    createEvent(): string {
        return this.eventsService.createEvent();
    }

    @Get(':id')
    getEvent(@Param('id') id: string): string {
        return this.eventsService.getEvent(+id);
    }

    @Put(':id')
    updateEvent(@Param('id') id: string): string {
        return this.eventsService.updateEvent(+id);
    }
}
