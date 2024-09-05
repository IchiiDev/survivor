import {
  Connection,
  createConnection,
  FieldPacket,
  QueryResult,
} from 'mysql2/promise';

export class DatabaseHandler {
  private connection: Connection | null = null;

  constructor() {}

  async init(): Promise<DatabaseHandler> {
    this.connection = await createConnection({
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
    });
    return this;
  }

  async query(
    sql: string,
    values?: any,
  ): Promise<[QueryResult, FieldPacket[]]> {
    if (!this.connection) {
      throw new Error('Database connection not initialized');
    }
    return this.connection.query(sql, values);
  }

  async close(): Promise<void> {
    if (this.connection) {
      await this.connection.end();
    }
  }
}
