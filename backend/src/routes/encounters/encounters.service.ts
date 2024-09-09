import { Injectable } from '@nestjs/common';
import { db } from '../../main';

@Injectable()
export class EncountersService {
  async getAllEncounters(): Promise<
    | {
        id: string;
        customer_id: string;
        date: string;
        rating: string;
        comment: string;
        source: string;
      }[]
    | null
  > {
    const result = await db.query('SELECT * FROM encounters');

    if (Array.isArray(result[0])) {
      return result[0].map((row: any) => ({
        id: row.id,
        customer_id: row.customer_id,
        date: row.date,
        rating: row.rating,
        comment: row.comment,
        source: row.source,
      }));
    }
    return null;
  }

  async createEncounter(
    customer_id: string,
    date: string,
    rating: string,
    comment: string,
    source: string,
  ): Promise<string> {
    await db.query(
      'INSERT INTO encounters (customer_id, date, rating, comment, source) VALUES (?, ?, ?, ?, ?)',
      [customer_id, date, rating, comment, source],
    );
    return 'New encounters created';
  }

  async getEncounter(id: string): Promise<{
    customer_id: string;
    date: string;
    rating: string;
    comment: string;
    source: string;
  }> {
    const result = await db.query('SELECT * FROM encounters WHERE id=?', id);
    return result[0][0];
  }

  async updateEncounter(
    id: string,
    customer_id: string,
    date: string,
    rating: string,
    comment: string,
    source: string,
  ): Promise<{
    id: string;
    customer_id: string;
    date: string;
    rating: string;
    comment: string;
    source: string;
  }> {
    await db.query(
      'UPDATE encounters SET customer_id=?, date=?, rating=?, comment=?, source=? WHERE id=?',
      [customer_id, date, rating, comment, source, id],
    );
    const result = await db.query('SELECT * FROM encounters WHERE id=?', id);
    return result[0][0];
  }

  async deleteEncounter(id: string): Promise<string> {
    await db.query('DELETE FROM encounters WHERE id=?', id);
    return `Encounter with id ${id} successfully deleted`;
  }
}
