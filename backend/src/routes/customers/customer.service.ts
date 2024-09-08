import { Injectable } from '@nestjs/common';
import { db } from '../../main';

@Injectable()
export class CustomersService {
    async getAllCustomers(): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string,
        phone?: string,
        address?: string
    }[]
        | null> {
        const result = await db.query('SELECT * FROM customers');

        if (Array.isArray(result[0])) {
            return result[0].map((row: any) => ({
                id: row.id,
                email: row.email,
                name: row.name,
                surname: row.surname,
                birthdate: row.birthdate,
                gender: row.gender,
                description: row.description,
                astrological_sign: row.astrological_sign,
                phone: row.phone,
                address: row.address
            }));
        }
        return null;
    }

    async createCustomer(
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string,
        phone?: string,
        address?: string
    ): Promise<string> {
        await db.query(
            'INSERT INTO customers ( email, name, surname, birthdate, gender, description, astrological_sign, phone, address ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [email, name, surname, birthdate, gender, description, astrological_sign, phone, address],
        );
        return 'New customer created';
    }

    async getCustomer(id: string): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string,
        phone?: string,
        address?: string
    }> {
        const result = await db.query('SELECT * FROM customers WHERE id=?', id);

        return result[0][0];
    }

    async updateCustomer(
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string,
        phone?: string,
        address?: string
    ): Promise<{
        id: string,
        email: string,
        name: string,
        surname: string,
        birthdate?: string,
        gender?: string,
        description?: string,
        astrological_sign?: string
        phone?: string,
        address?: string
    } | null> {
        await db.query(
            'UPDATE customers SET email=?, name=?, surname=?, birthdate=?, gender=?, description=?, astrological_sign=?, phone=?, address=? WHERE id=?',
            [email, name, surname, birthdate, gender, description, astrological_sign, phone, address, id]
        );
        const result = await db.query(
            'SELECT * FROM customers WHERE id=?',
            id
        );
        return result[0][0];
    }

    async deleteCustomer(id: string): Promise<string> {
        await db.query('DELETE FROM customers WHERE id=?', id);
        return `Customer with id ${id} successfully deleted`;
    }
}
