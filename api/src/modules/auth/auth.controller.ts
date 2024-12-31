import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  AuthPayload,
  AuthService,
  LoginInput,
  LoginNoCodeInput,
  Public,
  RefreshTokenInput,
  VerifyTokenInput,
} from '@api/services';
import { Response, Request } from 'express';
import { CurrentUser } from '@api/core';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('captcha')
  @Public()
  async getCaptcha(@Req() req: Request, @Res() res: Response) {
    const { codekey } = req.headers;
    const captcha = await this.auth.getCaptcha(codekey as string);
    res.type('svg');
    res.status(200).send(captcha.data);
  }

  @Post('login')
  @Public()
  async login(@Body() login: LoginInput, @Req() req: Request) {
    const { codekey } = req.headers;
    return await this.auth.login(login, codekey as string);
  }

  @Post('login-no-code')
  @Public()
  async loginNoCode(@Body() login: LoginNoCodeInput) {
    return await this.auth.login(login, null, false);
  }

  @Post('refresh-token')
  @Public()
  async refreshToken(@Body() token: RefreshTokenInput) {
    return this.auth.refreshToken(token.refreshToken);
  }

  @Post('verify-token')
  @Public()
  async verifyToken(@Body() token: VerifyTokenInput) {
    return this.auth.verifyTokens(token);
  }

  @Post('logout')
  async logout(@CurrentUser() user: AuthPayload) {
    return await this.auth.logout(user);
  }
}
