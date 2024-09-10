import { Injectable } from "@nestjs/common";
import { db } from '../../main';

@Injectable()
export class MeService {
    async getCurrentEmployee(id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string
    }> {
        console.log(id);
        const result = await db.query(
            'SELECT id, email, name, surname, birth_date, gender, work FROM employees WHERE id=?',
            id
        );

        return result[0][0];
    }

    async updateCurrentEmployee(
        id: string,
        email?: string,
        password?: string,
        name?: string,
        surname?: string,
        birthdate?: string,
        gender?: string,
        work?: string
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string
    } | null> {
        let query = 'UPDATE employees SET ';
        let params = [];

        if (!email && !name && !surname && !password && !birthdate && !gender && !work)
            return null;

        if (email) {
            query += 'email=?, ';
            params.push(email);
        }
        if (name) {
            query += 'name=?, ';
            params.push(name);
        }
        if (surname) {
            query += 'surname=?, ';
            params.push(surname);
        }
        if (birthdate) {
            query += 'birth_date=?, ';
            params.push(birthdate);
        }
        if (gender) {
            query += 'gender=?, ';
            params.push(gender);
        }
        if (work) {
            query += 'work=?, ';
            params.push(work);
        }
        if (password) {
            query += 'password=?, ';
            params.push(password);
        }
        query = query.slice(0, -2);
        query += ' WHERE id=?';
        params.push(id);
        await db.query(
            query,
            params
        );
        const result = await db.query(
            'SELECT * FROM employees WHERE id=?',
            id
        );
        return result[0][0];
    }
}
