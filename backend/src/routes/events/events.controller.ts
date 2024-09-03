import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('events')
@ApiTags('events')
export class EventsController {
  @Get()
  getAllEvents(): string {
    return 'This action returns all events';
  }

  @Post()
  createEvent(): string {
    return 'This action creates a new event';
  }

  @Get(':id')
  getEvent(@Param('id') id: string): string {
    return `This action returns an event with id ${id}`;
  }

  @Put(':id')
  updateEvent(@Param('id') id: string): string {
    return `This action updates an event with id ${id}`;
  }
}
