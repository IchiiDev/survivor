import { Injectable } from "@nestjs/common";

@Injectable()
export class EventsService {
    getAllEvents(): string {
        return 'This service returns all events';
    }

    createEvent(): string {
        return 'This service creates a new event';
    }

    getEvent(id: number): string {
        return `This action returns an event with id ${id}`;
    }

    updateEvent(id: number): string {
        return `This action updates an event with id ${id}`;
    }
}
