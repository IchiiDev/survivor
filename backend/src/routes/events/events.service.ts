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
        name?: string,
        date?: string,
        max_participants?: string,
        location?: string,
        type?: string,
        employee_id?: string,
        location_name?: string
    ): Promise<{
        id: string,
        name: string,
        date: string,
        max_participants: string,
        location: string,
        type: string,
        employee_id: string,
        location_name: string
    } | null> {
        let query = 'UPDATE events SET ';
        let params = [];
        if (!name && !date && !max_participants && !location && !type && !employee_id && !location_name)
            return null;
        if (name) {
            query += 'name=?, ';
            params.push(name);
        }
        if (date) {
            query += 'date=?, ';
            params.push(date);
        }
        if (max_participants) {
            query += 'max_participants=?, ';
            params.push(max_participants);
        }
        if (location) {
            query += 'location=?, ';
            params.push(location);
        }
        if (type) {
            query += 'type=?, ';
            params.push(type);
        }
        if (employee_id) {
            query += 'employee_id=?, ';
            params.push(employee_id);
        }
        if (location_name) {
            query += 'location_name=?, ';
            params.push(location_name);
        }
        query = query.slice(0, -2);
        query += ' WHERE id=?';
        params.push(id);
        await db.query(
            query,
            params
        );
        const result = await db.query(
            'SELECT * FROM events WHERE id=?',
            id
        );
        return result[0][0];
    }
}