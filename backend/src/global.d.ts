declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';

    PORT: number;

    JWT_SECRET: string;
    JWT_EXPIRATION_TIME: string;

    DATABASE_URL: string;
    DATABASE_NAME: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;

    API_KEY: string;
  }
}
