import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt-payload.interface';
import { Password } from '../../password/password.entity';
import { PasswordRepository } from '../../password/services/password.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(PasswordRepository) private passwordRepository,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const { userId } = payload;
    const passwordRow: Password = await this.passwordRepository.findOne({
      userId,
    });
    if (!passwordRow) {
      throw new UnauthorizedException();
    }

    return { userId };
  }
}
