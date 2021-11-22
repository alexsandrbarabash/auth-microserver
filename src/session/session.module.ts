import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './services/jwt.strategy';
import { PasswordRepository } from '../password/services/password.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

// TODO:add refresh token
@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordRepository]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [SessionController],
  providers: [JwtStrategy],
})
export class SessionModule {}
