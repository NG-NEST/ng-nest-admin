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
      const payload = { userId };
      return {
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, {
          secret: jwtConstants.refreshSecret,
          expiresIn: jwtConstants.refreshSecret
        })
      };
    }
  }

  async getUserFromToken(token: string) {
    const { userId } = this.jwtService.decode(token, {
      json: true
    }) as { userId: string };
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    const { password, ...result } = user;

    return result;
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: jwtConstants.refreshSecret
      });

      return this.jwtService.sign({ userId });
    } catch (e) {
      throw new UnauthorizedException(AuthUnauthorized.TokenFailureOrValidationFailure);
    }
  }
}
