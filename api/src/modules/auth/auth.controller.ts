import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  AuthService,
  LoginInput,
  Public,
  RefreshTokenInput,
  VerifyTokenInput,
} from '@api/services';
import { Response, Request } from 'express';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private auth: AuthService) {}

  @Get('captcha')
  async getCaptcha(@Req() req: Request, @Res() res: Response) {
    const { codekey } = req.headers;
    const captcha = await this.auth.getCaptcha(codekey as string);
    res.type('svg');
    res.status(200).send(captcha.data);
  }

  @Post('login')
  async login(@Body() login: LoginInput, @Req() req: Request) {
    const { codekey } = req.headers;
    return await this.auth.login(login, codekey as string);
  }

  @Post('refresh-token')
  async refreshToken(@Body() token: RefreshTokenInput) {
    return this.auth.refreshToken(token.refreshToken);
  }

  @Post('verify-token')
  async verifyToken(@Body() token: VerifyTokenInput) {
    return this.auth.verifyToken(token);
  }
}
