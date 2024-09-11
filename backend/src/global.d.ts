declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';

    PORT: number;

    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: string;

    DATABASE_HOST: string;
    DATABASE_PORT: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASS: string;

    API_KEY: string;
    ADMIN_USER: string;
    ADMIN_PASS: string;
  }
}

export {};

declare global {
  namespace Express {
    export interface Request {
      user: { id: number; role: string };
    }
  }
}
