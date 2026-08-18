import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { env } from '../utils/env.js';
import { KEYS } from '../core/keys.js';
import helmet from 'helmet';
import { PrismaService } from '../database/prisma.service.js';

@Global()
@Module({
  providers: [
    {
      provide: PrismaService,
      useClass: PrismaService,
    },
    {
      provide: KEYS.ENV,
      useValue: env,
    },
  ],

  exports: [KEYS.ENV, PrismaService],
})
export class ConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
  }
}
