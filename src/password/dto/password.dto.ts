import { IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  password: string;
}
