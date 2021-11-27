import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordController } from './password.controller';
import { PasswordRepository } from './services/password.repository';
import { LocalStrategy } from './services/local.strategy';
import { PasswordService } from './services/password.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordRepository]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  controllers: [PasswordController],
  providers: [LocalStrategy, PasswordService],
  exports: [LocalStrategy],
})
export class PasswordModule {}
