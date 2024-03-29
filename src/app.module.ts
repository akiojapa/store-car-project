import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthMiddleware, LoggerMiddleware } from './logger/middleware';
import { CarsModule } from './cars/car.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0/store-project'), AuthModule, UsersModule, CarsModule],
  controllers: [],
  providers: [],
})
export class AppModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });

    consumer
      .apply(AuthMiddleware)
      .forRoutes({path: 'cars', method: RequestMethod.ALL})
  }

  c
}
