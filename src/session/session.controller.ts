import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('session')
export class SessionController {
  @UseGuards(AuthGuard('jwt'))
  @Post()
  checkSession(): boolean {
    return true;
  }
}
