import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CatsModule } from '../cats/cats.modules';
import { LoggerMiddleware } from '../../middlewares/logger.middleware';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
