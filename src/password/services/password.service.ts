import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordRepository } from './password.repository';
import { JwtService } from '@nestjs/jwt';
import { PasswordDto } from '../dto/password.dto';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(PasswordRepository)
    private passwordRepository: PasswordRepository,
    private jwtService: JwtService,
  ) {}

  async signUp({
    userId,
    password,
  }: PasswordDto): Promise<{ accessToken: string }> {
    console.log('it work');
    await this.passwordRepository.savePassword({ userId, password });
    const accessToken = await this.jwtService.sign({ userId });

    return { accessToken };
  }

  async signIn(userId: number): Promise<{ accessToken: string }> {
    const accessToken = await this.jwtService.sign({ userId });

    return { accessToken };
  }

  async passwordExist(userId: number): Promise<boolean> {
    const data = await this.passwordRepository.findOne({ userId });

    return !!data;
  }
}
