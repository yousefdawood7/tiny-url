import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { env } from '../utils/env.js';
import { KEYS } from '../core/keys.js';
import helmet from 'helmet';

@Global()
@Module({
  providers: [
    {
      provide: KEYS.ENV,
      useValue: env,
    },
  ],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
  }
}
