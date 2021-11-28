import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('session')
export class SessionController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  checkSession(@GetUser() user): any {
    return user;
  }
}
