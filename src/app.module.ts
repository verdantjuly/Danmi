import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './service/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './controller/classes.controller';
import { ClassesService } from './service/classes.service';
import { SessionModule } from './auth/session.module';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    SessionModule,
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],

  controllers: [UsersController, ClassesController],
  providers: [UsersService, ClassesService],
})
export class AppModule {}
