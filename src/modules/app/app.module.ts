import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CatsModule } from '../cats/cats.modules';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost/nest')],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
