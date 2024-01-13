import { BaseSelect, EncryptService, PrismaService } from '@api/core';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInput } from './dto';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthUnauthorized } from './enum';
import { Auth } from './model';

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
    const findUser = await this.prisma.user.findFirst({ select: { id: true, password: true }, where: { account } });
    let id = '';
    if (findUser === null) {
      throw new UnauthorizedException(AuthUnauthorized.AccountOrPasswordVerificationFailed);
    }
    if (this.encryptService.compare(user.password, findUser.password)) {
      id = findUser.id;
    }
    if (id === '') {
      throw new UnauthorizedException(AuthUnauthorized.AccountOrPasswordVerificationFailed);
    } else {
      return this.createTokens({ id });
    }
  }

  async getUserFromToken(id: string, select: BaseSelect) {
    const user = await this.prisma.user.findUnique({ where: { id }, ...select });
    const { password, ...result } = user;

    return result;
  }

  refreshToken(refreshToken: string) {
    try {
      const { id } = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret
      });

      return this.createTokens({ id });
    } catch (e) {
      throw new UnauthorizedException(AuthUnauthorized.TokenFailureOrValidationFailure);
    }
  }

  private createTokens(payload: { id: string }): Auth {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshExpiresIn
      })
    };
  }
}
