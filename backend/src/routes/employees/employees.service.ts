import { Injectable } from '@nestjs/common';
import { db } from '../../main';

@Injectable()
export class EmployeesService {
    async getAllEmployees(): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string,
    }[] | null> {
        const result = await db.query('SELECT * FROM employees');
        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                email: row.email,
                name: row.name,
                surname: row.surname,
                birthdate: row.birthdate,
                gender: row.gender,
                work: row.work
            }));
        }
        return null;
    }

    async createEmployee(
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    ): Promise<string> {
        await db.query(
            'INSERT INTO employees ( email, name, surname, birthdate, gender, work) VALUES (?, ?, ?, ?, ?, ?)',
            [email, name, surname, birthdate, gender, work],
        );
        return 'New employee created';
    }

    async getEmployee(id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    } | null> {
        const result = await db.query('SELECT * FROM employees WHERE id=?', id);

        return result[0][0];
    }

    async updateEmployee(
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    } | null> {
        await db.query(
            'UPDATE employees SET email=?, name=?, surname=?, birthdate=?, gender=?, work=? WHERE id=?',
            [email, name, surname, birthdate, gender, work, id],
        );
        const result = await db.query(
            'SELECT * FROM employees WHERE id=?',
            id
        );
        return result[0][0];
    }

    async deleteEmployee(id: string): Promise<string> {
        await db.query('DELETE FROM employees WHERE id=?', id);
        return `Employee with id ${id} successfully deleted`;
    }

    getCurrentEmployee(): string {
        return 'This service returns the current employee';
    }

    updateCurrentEmployee(): string {
        return 'This service updates the current employee';
    }

    // deleteCurrentEmployee(): string {
    //  return 'This service deletes the current employee';
    // }
}
