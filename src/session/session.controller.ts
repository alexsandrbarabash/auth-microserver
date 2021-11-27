import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { JwtPayload } from './types/jwt-payload.interface';

@Controller('session')
export class SessionController {
  @UseGuards(AuthGuard('jwt'))
  @Post()
  checkSession(@GetUser() user): JwtPayload {
    return {user, log: 'ad'};
  }
}
