import { BadRequestException, Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import {
  AuthService,
  LoginInput,
  Public,
  RefreshTokenInput,
  VerifyTokenInput,
  CAPTCHA,
} from '@api/services';
import { Response, Request } from 'express';
import { create } from 'svg-captcha';
import { RedisService } from '@api/core';

@Controller('auth')
@Public()
export class AuthController {
  constructor(
    private auth: AuthService,
    private redis: RedisService,
  ) {}

  @Get('captcha')
  async getCaptcha(@Req() req: Request, @Res() res: Response) {
    const { codekey } = req.headers;
    if (!codekey) throw new BadRequestException('请求异常！');
    const captcha = create({ noise: 2 });
    this.redis.set(`${CAPTCHA}:${codekey}`, captcha.text, 'EX', 60);
    res.type('svg');
    res.status(200).send(captcha.data);
  }

  @Post('login')
  async login(@Body() login: LoginInput, @Req() req: Request) {
    const { codekey } = req.headers;
    const { code } = login;
    const cacheCode = await this.redis.get(`${CAPTCHA}:${codekey}`);
    const codeSuccess = cacheCode?.toUpperCase() === code?.toUpperCase();
    if (!codeSuccess) throw new BadRequestException('验证码过期或错误！');
    return await this.auth.login(login);
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
