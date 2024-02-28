import { Body, Controller, Post } from '@nestjs/common';
import { AuthService, LoginInput, Public, RefreshTokenInput } from '@api/services';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  async login(@Body() login: LoginInput) {
    return await this.auth.login(login);
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: RefreshTokenInput) {
    return this.auth.refreshToken(token.refreshToken);
  }
}
