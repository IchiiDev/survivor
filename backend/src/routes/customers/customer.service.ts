import { Injectable } from '@nestjs/common';
import { db } from '../../main';

@Injectable()
export class CustomersService {
  async getAllCustomers(): Promise<
    | {
        id: string;
        email: string;
        name: string;
        surname: string;
        birthdate: string;
        gender: string;
        description: string;
        astrological_sign: string;
        phone: string;
        address: string;
      }[]
    | null
  > {
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
        address: row.address,
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
    address?: string,
  ): Promise<string> {
    let query = 'INSERT INTO customers ( email, name, surname';
    let values = ' VALUES (?, ?, ?';
    const params = [email, name, surname];

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
    if (description) {
      query += ', description';
      values += ', ?';
      params.push(description);
    }
    if (astrological_sign) {
      query += ', astrological_sign';
      values += ', ?';
      params.push(astrological_sign);
    }
    if (phone) {
      query += ', phone';
      values += ', ?';
      params.push(phone);
    }
    if (address) {
      query += ', address';
      values += ', ?';
      params.push(address);
    }
    query += ' )';
    values += ')';
    await db.query(query + values, params);
    return 'New customer created';
  }

  async getCustomer(
    id: string,
    includePaymentHistory?: boolean,
  ): Promise<{
    id: string;
    email: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    description: string;
    astrological_sign: string;
    phone: string;
    address: string;
    payment_history?: Array<{
      date: string;
      amount: number;
      payment_method: string;
      id: string;
      comment: string;
    }>;
  }> {
    const result = await db.query('SELECT * FROM customers WHERE id=?', id);

    if (!result[0][0]) {
      throw new Error(`Customer with id ${id} not found`);
    }
    if (includePaymentHistory) {
      const paymentHistory = await db.query(
        'SELECT * FROM payments WHERE customer_id=?',
        id,
      );
      result[0][0].paymentHistory = paymentHistory[0];
    }
    return result[0][0];
  }

  async updateCustomer(
    id: string,
    email?: string,
    name?: string,
    surname?: string,
    birthdate?: string,
    gender?: string,
    description?: string,
    astrological_sign?: string,
    phone?: string,
    address?: string,
  ): Promise<{
    id: string;
    email: string;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    description: string;
    astrological_sign: string;
    phone: string;
    address: string;
  } | null> {
    let query = 'UPDATE customers SET ';
    const params = [];

    if (
      !email &&
      !name &&
      !surname &&
      !birthdate &&
      !gender &&
      !description &&
      !astrological_sign &&
      !phone &&
      !address
    )
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
    if (description) {
      query += 'description=?, ';
      params.push(description);
    }
    if (astrological_sign) {
      query += 'astrological_sign=?, ';
      params.push(astrological_sign);
    }
    if (phone) {
      query += 'phone=?, ';
      params.push(phone);
    }
    if (address) {
      query += 'address=?, ';
      params.push(address);
    }
    query = query.slice(0, -2);
    query += ' WHERE id=?';
    params.push(id);
    await db.query(query, params);
    const result = await db.query('SELECT * FROM customers WHERE id=?', id);
    return result[0][0];
  }

  async deleteCustomer(id: string): Promise<string> {
    await db.query('DELETE FROM customers WHERE id=?', id);
    return `Customer with id ${id} successfully deleted`;
  }
}
