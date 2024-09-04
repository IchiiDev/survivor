import { createConnection } from 'mysql2';

export const db = createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
});

export async function initDB(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack);
        reject(err);
      } else {
        console.log('connected as id ' + db.threadId);
        resolve();
      }
    });
  });
}
