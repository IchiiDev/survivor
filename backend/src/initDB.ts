import {
  Connection,
  createConnection,
  FieldPacket,
  QueryResult,
} from 'mysql2/promise';
import { db } from './main';
import { v4 as uuidv4 } from 'uuid';

export class DatabaseHandler {
  private connection: Connection | null = null;
  private token: string | null = null;

  constructor() {}

  async populateCustomers(): Promise<void> {
    console.log('EVENT: Populating customers');
    const customers = await fetch(`${process.env.API_URL}/customers`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'X-Group-Authorization': process.env.API_KEY,
      },
    }).then((res) => res.json());
    console.log(`Found ${customers.length} customers. Adding to database...`);
    for (const customer of customers) {
      console.log(
        `Fetching customer ${customer.id} (${customer.name} ${customer.surname}<${customer.email}>)`,
      );
      const data = await fetch(
        `${process.env.API_URL}/customers/${customer.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'X-Group-Authorization': process.env.API_KEY,
          },
        },
      ).then((res) => {
        if (res.ok) return res.json();
        else return null;
      });
      const image = await fetch(
        `${process.env.API_URL}/customers/${customer.id}/image`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'X-Group-Authorization': process.env.API_KEY,
          },
        },
      ).then((res) => {
        if (res.ok) return res.blob();
        else return null;
      });
      if (!data) {
        console.log('Failed to fetch data for customer.');
        continue;
      }
      let image_uuid: string | null = null;
      if (image) {
        const imageBuffer = await image.arrayBuffer();
        image_uuid = uuidv4();
        await db.query('INSERT INTO images SET ?', {
          uuid: image_uuid,
          scope: 'customers',
          format: 'image/png',
          content: Buffer.from(imageBuffer),
        });
      }
      await db.query('INSERT INTO customers SET ?', {
        name: data.name,
        surname: data.surname,
        email: data.email,
        phone: data.phone_number,
        address: data.address,
        image: image_uuid,
        birthdate: data.birth_date,
        gender: data.gender,
        astrological_sign: data.astrological_sign,
        description: data.description,
      });
      console.log('Done.');
      console.log('Fetching clothes...');
      const clothes = await fetch(
        `${process.env.API_URL}/customers/${customer.id}/clothes`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'X-Group-Authorization': process.env.API_KEY,
          },
        },
      ).then((res) => res.json());
      console.log(`Found ${clothes.length} clothes. Adding to database...`);
      // if NODE_ENV is development, limit the number of clothes to 3
      if (process.env.NODE_ENV === 'development') clothes.splice(3);
      for (const cloth of clothes) {
        console.log(`Fetching cloth ${cloth.id}`);
        const clothImage = await fetch(
          `${process.env.API_URL}/clothes/${cloth.id}/image`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'X-Group-Authorization': process.env.API_KEY,
            },
          },
        ).then((res) => {
          if (res.ok) return res.blob();
          else return null;
        });
        let clothImage_uuid: string | null = null;
        if (clothImage) {
          const clothImageBuffer = await clothImage.arrayBuffer();
          clothImage_uuid = uuidv4();
          await db.query('INSERT INTO images SET ?', {
            uuid: clothImage_uuid,
            scope: 'clothes',
            format: 'image/png',
            content: Buffer.from(clothImageBuffer),
          });
        }
        await db.query('INSERT INTO clothes SET ?', {
          type: cloth.type,
          image: clothImage_uuid,
        });
      }
    }
  }

  async populateEmployees(): Promise<void> {
    console.log('EVENT: Populating employees');
    const employees = await fetch(`${process.env.API_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'X-Group-Authorization': process.env.API_KEY,
      },
    }).then((res) => res.json());
    console.log(`Found ${employees.length} employees. Adding to database...`);
    for (const employee of employees) {
      console.log(
        `Fetching employee ${employee.id} (${employee.name} ${employee.surname}<${employee.email}>)`,
      );
      const data = await fetch(
        `${process.env.API_URL}/employees/${employee.id}`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'X-Group-Authorization': process.env.API_KEY,
          },
        },
      ).then((res) => {
        if (res.ok) return res.json();
        else return null;
      });
      if (!data) {
        console.log('Failed to fetch data for employee.');
        continue;
      }
      const image = await fetch(
        `${process.env.API_URL}/employees/${employee.id}/image`,
        {
          headers: {
            Authorization: `Bearer ${this.token}`,
            'X-Group-Authorization': process.env.API_KEY,
          },
        },
      ).then((res) => {
        if (res.ok) return res.blob();
        else return null;
      });
      let image_uuid: string | null = null;
      if (image) {
        const imageBuffer = await image.arrayBuffer();
        image_uuid = uuidv4();
        await this.query('INSERT INTO images SET ?', {
          uuid: image_uuid,
          scope: 'employees',
          format: 'image/png',
          content: Buffer.from(imageBuffer),
        });
      }
      await this.query('INSERT INTO employees SET ?', {
        name: data.name,
        surname: data.surname,
        email: data.email,
        image: image_uuid,
        birth_date: data.birth_date,
        gender: data.gender,
        work: data.work,
        password: 'none',
      });
      console.log('Done.');
    }
  }

  async populateDatabase(): Promise<void> {
    if (!this.connection)
      throw new Error('Database connection not initialized');

    const [rows] = <[QueryResult[], FieldPacket[]]>(
      await this.query('SELECT * FROM employees')
    );
    if (rows.length > 10) return;
    console.log('EVENT: Populating database with initial data');
    const result = await fetch(`${process.env.API_URL}/employees/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Group-Authorization': process.env.API_KEY,
      },
      body: JSON.stringify({
        email: process.env.ADMIN_USER,
        password: process.env.ADMIN_PASS,
      }),
    }).then((res) => res.json());
    this.token = result.access_token;

    await this.populateCustomers();
    await this.populateEmployees();
  }

  async init(): Promise<DatabaseHandler> {
    console.log('EVENT: Initializing database connection');
    console.log('Connecting to database...');
    this.connection = await createConnection({
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
    });
    this.populateDatabase();
    return this;
  }

  async query(sql: string, values?: any) {
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
