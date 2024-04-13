import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

import { OrdersModule } from './orders/orders.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';

import { ThrottlerBehindProxyGuard } from './common/guards/throttlerProxy.guard';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 30,
      },
    ]),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        ENVIRONMENT: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerBehindProxyGuard,
    },
  ],
})
export class AppModule {}
