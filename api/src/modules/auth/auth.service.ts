import { EncryptService, PrismaService } from '@api/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthUnauthorized } from './enum';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private encryptService: EncryptService, private jwtService: JwtService) {}

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { account } });
    if (user && this.encryptService.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginInput) {
    const { account } = user;
    const findUser = await this.prisma.user.findFirst({ where: { account } });
    let userId = '';
    if (findUser === null) {
      throw new UnauthorizedException(AuthUnauthorized.AccountOrPasswordVerificationFailed);
    }
    if (this.encryptService.compare(user.password, findUser.password)) {
      const { id } = findUser;
      userId = id;
    }
    if (userId === '') {
      throw new UnauthorizedException(AuthUnauthorized.AccountOrPasswordVerificationFailed);
    } else {
      return {
        accessToken: this.jwtService.sign(
          { userId },
          {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.expiresIn
          }
        ),
        refreshToken: this.jwtService.sign(
          { userId },
          {
            secret: jwtConstants.secret,
            expiresIn: jwtConstants.refreshIn
          }
        )
      };
    }
  }

  getUser(token: string) {
    const user: any = this.jwtService.decode(token.replace('Bearer ', ''), {
      json: true
    });
    const { exp, iat, ...result } = user;
    return result;
  }
}
