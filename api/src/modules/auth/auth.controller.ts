import { Body, Controller, Post } from '@nestjs/common';
import { LoginInput } from '@api/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginInput) {
    return await this.auth.login(login);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    return this.auth.refreshToken(refreshToken);
  }
}
