import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DatabaseHandler } from './initDB';

export const db = new DatabaseHandler();

async function bootstrap() {
  await db.init();

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Soul Connect API')
    .setDescription('Complete API documentation')
    .setVersion('1.0')
    .addApiKey({
      type: 'http',
      name: 'Bearer Token',
      in: 'header',
      description: 'Enter your Bearer token here',
      scheme: 'bearer',
    })
    .addTag('customers', 'Operations related to customers')
    .addTag('employees', 'Operations related to employees')
    .addTag('encounters', 'Operations related to encounters')
    .addTag('events', 'Operations related to events')
    .addTag('images', 'Operations related to images and files')
    .addTag('login', 'Login routes')
    .addTag('tips', 'Operations related to tips')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
