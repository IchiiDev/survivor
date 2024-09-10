import {
    Connection,
    createConnection,
    FieldPacket,
    QueryResult,
} from 'mysql2/promise';
import { db } from './main';
import { v4 as uuidv4 } from 'uuid';
import { Location } from './types/Event';

export class DatabaseHandler {
    private connection: Connection | null = null;
    private token: string | null = null;

    constructor() { }

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
            console.log('Done.');

            // fetch payments history
            console.log('Fetching payments...');
            const payments = await fetch(
                `${process.env.API_URL}/customers/${customer.id}/payments_history`,
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'X-Group-Authorization': process.env.API_KEY,
                    },
                },
            ).then((res) => res.json());
            console.log(`Found ${payments.length} payments. Adding to database...`);
            for (const payment of payments) {
                await db.query('INSERT INTO payments SET ?', {
                    customer_id: customer.id,
                    date: payment.date,
                    amount: payment.amount,
                    comment: payment.comment,
                    method: payment.payment_method,
                });
            }
            console.log('Done.');
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

    async populateTips(): Promise<void> {
        console.log('EVENT: Populating tips');
        const tips = await fetch(`${process.env.API_URL}/tips`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'X-Group-Authorization': process.env.API_KEY,
            },
        }).then((res) => res.json());

        console.log(`Found ${tips.length} tips. Adding to database...`);
        for (const tip of tips) {
            console.log(`Adding tip ${tip.title}`);
            console.log(`Tip: ${tip.tip}`);
            await this.query('INSERT INTO tips SET ?', {
                title: tip.title,
                tip: tip.tip,
            });
        }
        console.log('Done.');
    }

    async populateEncounters(): Promise<void> {
        console.log('EVENT: Populating encounters');
        const encounters = await fetch(`${process.env.API_URL}/encounters`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'X-Group-Authorization': process.env.API_KEY,
            },
        }).then((res) => res.json());
        console.log(`Found ${encounters.length} encounters. Adding to database...`);
        for (const encounter of encounters) {
            console.log(`Fetching encounter ${encounter.id}`);
            const data = await fetch(
                `${process.env.API_URL}/encounters/${encounter.id}`,
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
                console.log('Failed to fetch data for encounter.');
                continue;
            }
            console.log(`Adding encounter ${data.id}`);
            await this.query('INSERT INTO encounters SET ?', {
                customer_id: data.customer_id,
                date: data.date,
                rating: data.rating,
                comment: data.comment,
                source: data.source,
            });
            console.log('Done.');
        }
    }

    async populateEvents(): Promise<void> {
        console.log('EVENT: Populating events');
        const events = await fetch(`${process.env.API_URL}/events`, {
            headers: {
                Authorization: `Bearer ${this.token}`,
                'X-Group-Authorization': process.env.API_KEY,
            },
        }).then((res) => res.json());
        console.log(`Found ${events.length} events. Adding to database...`);
        for (const event of events) {
            console.log(`Fetching event ${event.id}`);
            const data = await fetch(`${process.env.API_URL}/events/${event.id}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    'X-Group-Authorization': process.env.API_KEY,
                },
            }).then((res) => {
                if (res.ok) return res.json();
                else return null;
            });
            if (!data) {
                console.log('Failed to fetch data for event.');
                continue;
            }
            console.log(`Adding event ${data.id}`);
            await this.query('INSERT INTO events SET ?', {
                name: data.name,
                duration: data.duration,
                date: data.date,
                location: new Location({
                    x: data.location_x,
                    y: data.location_y,
                }).toString(),
                type: data.type,
                employee_id: data.employee_id,
                location_name: data.location_name,
                max_participants: data.max_participants,
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
        await this.populateTips();
        await this.populateEncounters();
        await this.populateEvents();
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
