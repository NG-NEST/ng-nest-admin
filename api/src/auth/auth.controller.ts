import { Controller, Get, UseGuards, HttpStatus, HttpCode, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() params): Promise<any> {
    return this.authService.login(params.account, params.password);
  }

  @Get('menus')
  @UseGuards(AuthGuard('jwt'))
  async menus(): Promise<any> {
    return this.authService.menus();
  }
}
