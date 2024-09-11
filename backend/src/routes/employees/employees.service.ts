import { Injectable } from '@nestjs/common';
import { db } from '../../main';

@Injectable()
export class EmployeesService {
    async getAllEmployees(): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string,
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
        password: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        work?: string
    ): Promise<string> {
        let query = 'INSERT INTO employees ( email, password, name, surname';
        let values = ' VALUES (?, ?, ?, ?';
        let params = [email, password, name, surname];

        if (birthdate) {
            query += ', birthdate';
            values += ', ?';
            params.push(birthdate);
        }
        if (gender) {
            query += ', gender';
            values += ', ?';
            params.push(gender);
        }
        if (work) {
            query += ', work';
            values += ', ?';
            params.push(work);
        }
        query += ' )';
        values += ')';
        await db.query(
            query + values,
            params
        );
        return 'New employee created';
    }

    async getEmployee(id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string
    } | null> {
        const result = await db.query(
            'SELECT id, email, name, surname, birth_date, gender, work FROM employees WHERE id=?',
            id
        );

        return result[0][0];
    }

    async updateEmployee(
        id: string,
        email?: string,
        password?: string,
        name?: string,
        surname?: string,
        birthdate?: string,
        gender?: string,
        work?: string,
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate: string,
        gender: string,
        work: string,
        password: string
    } | null> {
        let query = 'UPDATE employees SET ';
        let params = [];

        if (!email && !name && !surname && !birthdate && !gender && !work && !password)
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
            query += 'birthdate=?, ';
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
            query += 'password=?, '
            params.push(password);
        }
        query = query.slice(0, -2);
        query += ' WHERE id=?';
        params.push(id);
        console.log(query);
        console.log(params);
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

    async deleteEmployee(id: string): Promise<string> {
        await db.query('DELETE FROM employees WHERE id=?', id);
        return `Employee with id ${id} successfully deleted`;
    }

    // deleteCurrentEmployee(): string {
    //  return 'This service deletes the current employee';
    // }
}
