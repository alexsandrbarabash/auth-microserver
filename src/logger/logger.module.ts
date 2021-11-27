import { Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './logger.constants';
import { PinoLoggerService } from './pino-logger.service';
import { ConfigModule } from '@nestjs/config';

const asyncLocalStorage = new AsyncLocalStorage();

@Module({
  imports: [ConfigModule],
  providers: [
    PinoLoggerService,
    {
      provide: ASYNC_STORAGE,
      useValue: asyncLocalStorage,
    },
  ],
  exports: [PinoLoggerService],
})
export class LoggerModule {}
