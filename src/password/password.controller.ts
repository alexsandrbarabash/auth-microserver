import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PasswordDto } from './dto/password.dto';
import { PasswordService } from './services/password.service';

@Controller('password')
export class PasswordController {
  constructor(private passwordService: PasswordService) {}

  @Get('/:userId')
  passwordExist(@Param('userId') userId: number): Promise<boolean> {
    return this.passwordService.passwordExist(userId);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signIn')
  signIn(
    @Body() authCredentialsDto: PasswordDto,
  ): Promise<{ accessToken: string }> {
    return this.passwordService.signIn(authCredentialsDto.userId);
  }

  @Post('signUp')
  signUp(
    @Body() authCredentialsDto: PasswordDto,
  ): Promise<{ accessToken: string }> {
    return this.passwordService.signUp(authCredentialsDto);
  }
}
