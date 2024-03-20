import { BaseSelect, EncryptService, PrismaService, RedisService, ms } from '@api/core';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH, CAPTCHA, JWT_CONSTANTS } from './constants';
import { LoginInput } from './login.input';
import { AuthI18n, AuthUnauthorized } from './auth.enum';
import { Auth } from './auth.model';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { VerifyTokenInput } from './verify-token.input';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { VerifyTokenOutput } from './verify-token.output';
import { CaptchaObj, create } from 'svg-captcha';
import { LoginNoCodeInput } from './login-no-code.input';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(account: string, password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { account } });
    if (user && this.encryptService.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(input: LoginInput | LoginNoCodeInput, codekey: string, requiredCode = true) {
    const lang = I18nContext.current().lang;

    const { password, account } = input;
    if (requiredCode && input instanceof LoginInput) {
      const code = input.code;
      const cacheCode = await this.redisService.get(`${CAPTCHA}:${codekey}`);
      const codeSuccess = cacheCode?.toUpperCase() === code?.toUpperCase();
      if (!codeSuccess) {
        throw new BadRequestException(
          this.i18n.t(`${AuthI18n}.${AuthUnauthorized.CodeVerificationFailed}`, {
            lang,
          }),
        );
      }
    }

    const findUser = await this.prisma.user.findFirst({
      select: {
        id: true,
        password: true,
      },
      where: { account },
    });
    let id = '';
    const throwMsg = () => {
      throw new UnauthorizedException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.AccountOrPasswordVerificationFailed}`, {
          lang,
        }),
      );
    };
    if (findUser === null) {
      throwMsg();
      return null;
    }
    if (this.encryptService.compare(password, findUser.password)) {
      id = findUser.id;
    }
    if (id === '') {
      throwMsg();
      return null;
    } else {
      return this.createTokens({ id, ...(await this.getUserRolesAndPermissions(id)) });
    }
  }

  async getCaptcha(codekey: string): Promise<CaptchaObj> {
    const lang = I18nContext.current().lang;
    if (!codekey) {
      throw new BadRequestException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.IdentificationIsNotEmpty}`, {
          lang,
        }),
      );
    }
    const captcha = create({ noise: 2 });
    await this.redisService.set(`${CAPTCHA}:${codekey}`, captcha.text, 'EX', 60);

    return captcha;
  }

  async getUserFromToken(id: string, select: BaseSelect) {
    const user = await this.prisma.user.findUnique({ where: { id }, ...select });
    const { password, ...result } = user;

    return result;
  }

  async refreshToken(refreshToken: string) {
    try {
      const { id } = this.jwtService.verify(refreshToken, {
        secret: JWT_CONSTANTS.refreshSecret,
      });

      return this.createTokens({ id, ...(await this.getUserRolesAndPermissions(id)) });
    } catch (e) {
      const lang = I18nContext.current().lang;

      throw new UnauthorizedException(
        this.i18n.t(`${AuthI18n}.${AuthUnauthorized.TokenFailureOrValidationFailure}`, { lang }),
      );
    }
  }

  async verifyToken(input: VerifyTokenInput) {
    const result: VerifyTokenOutput = {};
    if (input.accessToken) {
      try {
        await this.jwtService.verifyAsync(input.accessToken, {
          secret: JWT_CONSTANTS.secret,
        });
        result.accessToken = true;
      } catch (e) {
        result.accessToken = false;
      }
    }
    if (input.refreshToken) {
      try {
        await this.jwtService.verifyAsync(input.refreshToken, {
          secret: JWT_CONSTANTS.refreshSecret,
        });
        result.refreshToken = true;
      } catch (e) {
        result.refreshToken = false;
      }
    }

    return result;
  }

  private async createTokens(payload: {
    id: string;
    permissions?: string[];
    roles?: string[];
  }): Promise<Auth> {
    const accessToken = await this.createToken(
      'accessToken',
      payload,
      JWT_CONSTANTS.secret,
      JWT_CONSTANTS.expiresIn,
    );
    const refreshToken = await this.createToken(
      'refreshToken',
      payload,
      JWT_CONSTANTS.refreshSecret,
      JWT_CONSTANTS.refreshExpiresIn,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createToken(
    key: string,
    payload: {
      id: string;
      permissions?: string[];
      roles?: string[];
    },
    secret: string,
    expiresIn: string,
  ) {
    const sso = this.config.getOrThrow<boolean>('sso');
    if (sso) {
      const { id } = payload;
      let token = await this.redisService.get(`${AUTH}:${id}:${key}`);
      if (!token) {
        token = this.jwtService.sign(payload, {
          secret: secret,
          expiresIn: expiresIn,
        });
        await this.redisService.set(`${AUTH}:${id}:${key}`, token, 'PX', ms(expiresIn));
      }
      return token;
    } else {
      return this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: expiresIn,
      });
    }
  }

  private async getUserRolesAndPermissions(id: string) {
    const findUser = await this.prisma.user.findFirst({
      select: {
        roles: { select: { roleId: true } },
      },
      where: { id },
    });
    if (!findUser) {
      return null;
    }
    const rolePermissions = await this.prisma.rolesOnPermissions.findMany({
      where: {
        roleId: { in: findUser.roles.map((role) => role.roleId) },
      },
      select: {
        permission: { select: { code: true } },
      },
    });
    const permissions = [
      ...new Set(rolePermissions.map((permission) => permission.permission.code)),
    ];
    const roles = findUser.roles.map((role) => role.roleId);
    return { permissions, roles };
  }
}
