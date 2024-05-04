import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'POST, GET, DELETE, PATCH, PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(4000);
}

bootstrap();
