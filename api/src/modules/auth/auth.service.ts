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
      return this.createTokens({ userId });
    }
  }

  async getUserFromToken(token: string, select: BaseSelect) {
    const { userId } = this.jwtService.decode(token, {
      json: true
    }) as { userId: string };
    const user = await this.prisma.user.findUnique({ where: { id: userId }, ...select });
    const { password, ...result } = user;

    return result;
  }

  refreshToken(refreshToken: string) {
    try {
      const { userId } = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret
      });

      return this.createTokens({ userId });
    } catch (e) {
      throw new UnauthorizedException(AuthUnauthorized.TokenFailureOrValidationFailure);
    }
  }

  private createTokens(payload: { userId: string }): Auth {
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        secret: jwtConstants.refreshSecret,
        expiresIn: jwtConstants.refreshExpiresIn
      })
    };
  }
}
