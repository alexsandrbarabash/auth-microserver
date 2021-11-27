import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PasswordModule } from './password/password.module';
import { configValidationSchema } from './config/config.schema';
import { LoggerModule } from './logger/logger.module';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import { DatabaseModule } from './db/database.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    LoggerModule,
    DatabaseModule,
    PasswordModule,
    SessionModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
