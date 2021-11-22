import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PasswordRepository } from './password.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(PasswordRepository) private passwordRepository,
  ) {
    super({ usernameField: 'userId' });
  }

  async validate(userId: number, password: string): Promise<number> {
    const data = await this.passwordRepository.findOne({ userId });
    if (!data) {
      throw new NotFoundException();
    }
    const hash = await new Promise((resolve, reject) =>
      bcrypt.hash(password, data.salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      }),
    );
    if (hash !== data.hash) {
      throw new UnauthorizedException();
    }
    return data.userId;
  }
}
