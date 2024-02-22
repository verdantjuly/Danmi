import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import session from 'express-session';

@Module({})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: { expires: new Date(Date.now() + 60 * 60 * 1000) },
        }),
      )
      .forRoutes('*');
  }
}
