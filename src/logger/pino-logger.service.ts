import { AsyncLocalStorage } from 'async_hooks';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import pinoLogger from 'pino';
import { ASYNC_STORAGE } from './logger.constants';
import { MessageData } from './types/message-data.interface';
import { AsyncStorageData } from './types/async-storage-data.interface';
import { ConfigService } from '@nestjs/config';

const pino = pinoLogger({ prettyPrint: true });

@Injectable()
export class PinoLoggerService implements LoggerService {
  constructor(
    @Inject(ASYNC_STORAGE)
    private readonly asyncStorage: AsyncLocalStorage<AsyncStorageData>,
    private configService: ConfigService,
  ) {}

  private getMessage(message: any, context?: string) {
    return context ? `[${context}] ${message}` : message;
  }

  private getTrace() {
    return this.asyncStorage.getStore()?.traceId;
  }

  log(message: MessageData | string, context?: string) {
    const traceId = this.getTrace();
    if (typeof message === 'object') {
      return pino.info(
        { app: this.configService.get('APP_NAME'), traceId, ...message.data },
        this.getMessage(message.text, context),
      );
    }
    pino.info(
      { app: this.configService.get('APP_NAME'), traceId },
      this.getMessage(message, context),
    );
  }

  error(message: MessageData | string, trace?: string, context?: string) {
    const traceId = this.getTrace();
    if (typeof message === 'object') {
      return pino.info(
        { app: this.configService.get('APP_NAME'), traceId, ...message.data },
        this.getMessage(message.text, context),
      );
    }
    pino.error(
      { app: this.configService.get('APP_NAME'), traceId, stack: trace },
      this.getMessage(message, context),
    );
  }

  warn(message: MessageData | string, context?: string): any {
    const traceId = this.getTrace();
    if (typeof message === 'object') {
      return pino.info(
        { app: this.configService.get('APP_NAME'), traceId, ...message.data },
        this.getMessage(message.text, context),
      );
    }
    pino.warn(
      { app: this.configService.get('APP_NAME'), traceId },
      this.getMessage(message, context),
    );
  }
}
