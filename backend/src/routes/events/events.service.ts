import { Injectable } from "@nestjs/common";
import { db } from '../../main';
import { max } from "rxjs";

@Injectable()
export class EventsService {
    async getAllEvents(): Promise<{
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    }[] | null> {
        const result = await db.query('SELECT * FROM events');

        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                name: row.name,
                date: row.date,
                max_participants: row.max_participants,
                location: row.location,
                type: row.type,
                employee_id: row.employee_id,
                location_name: row.location_name
            }));
        }
        return null;
    }

    async createEvent(
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    ): Promise<string> {
        await db.query(
            'INSERT INTO events (name, date, max_participants, location, type, employee_id, location_name) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, date, max_participants, location, type, employee_id, location_name]
        );
        return 'New customer created';
    }

    async getEvent(id: string): Promise<{
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    }> {
        const result = await db.query('SELECT * FROM events WHERE id=?', id);
        return result[0][0];
    }

    async updateEvent(
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
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
        await db.query(
            'UPDATE events SET name=?, date=?, max_participants=?, location=?, type=?, employee_id=?, location_name=? WHERE id=?',
            [name, date, max_participants, location, type, employee_id, location_name, id]
        );
        const result = await db.query(
            'SELECT * FROM events WHERE id=?',
            id
        );
        return result[0][0];
    }
}
