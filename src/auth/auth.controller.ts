import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserRole } from './roles.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string; email: string; role?: UserRole }) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
@Post('login')
async login(@Body() body: { username: string; password: string }) {
  return this.authService.login(body);
}

}


