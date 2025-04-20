import {
  BaseSelect,
  EncryptService,
  I18nService,
  PrismaService,
  RedisService,
  ms,
} from '@api/core';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AUTH, CAPTCHA, JWT_CONSTANTS } from './auth.constants';
import { LoginInput } from './login.input';
import { AUTH_I18N, AuthUnauthorized } from './auth.enum';
import { Auth } from './auth.model';
import { VerifyTokenInput } from './verify-token.input';
import { VerifyTokenOutput } from './verify-token.output';
import { CaptchaObj, create } from 'svg-captcha';
import { LoginNoCodeInput } from './login-no-code.input';
import { AuthPayload } from './auth-payload';
import { IncomingHttpHeaders } from 'node:http';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
    private readonly encryptService: EncryptService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
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
    const { password, account } = input;
    if (requiredCode && input instanceof LoginInput) {
      const code = input.code;
      const cacheCode = await this.redisService.get(`${CAPTCHA}:${codekey}`);
      const codeSuccess = cacheCode?.toUpperCase() === code?.toUpperCase();
      if (!codeSuccess) {
        throw new BadRequestException(
          this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.CodeVerificationFailed}`),
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
        this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.AccountOrPasswordVerificationFailed}`),
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

  async logout(payload: AuthPayload) {
    const { id } = payload;
    await this.redisService.del(`${AUTH}:${id}:accessToken`);
    await this.redisService.del(`${AUTH}:${id}:refreshToken`);

    return { loggedOut: true };
  }

  async getCaptcha(codekey: string): Promise<CaptchaObj> {
    if (!codekey) {
      throw new BadRequestException(
        this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.IdentificationIsNotEmpty}`),
      );
    }
    const captcha = create({ noise: 2 });
    await this.redisService.set(`${CAPTCHA}:${codekey}`, captcha.text, 'EX', 60);

    return captcha;
  }

  async getUserById(id: string, select: BaseSelect) {
    const user = await this.prisma.user.findUnique({ where: { id }, ...select });
    // const permisions = await this.prisma.user.findUnique({
    //   where: { id },
    //   select: {
    //     roles: {
    //       select: {
    //         role: {
    //           select: { permissions: { select: { permission: { select: { name: true } } } } },
    //         },
    //       },
    //     },
    //   },
    // });
    // console.log(JSON.stringify(permisions));
    const { password, ...result } = user;

    return result;
  }

  async refreshToken(refreshToken: string) {
    try {
      const { id } = await this.jwtService.verifyAsync<AuthPayload>(refreshToken, {
        secret: JWT_CONSTANTS.refreshSecret,
      });

      return this.createTokens({ id, ...(await this.getUserRolesAndPermissions(id)) }, true);
    } catch (e) {
      throw new UnauthorizedException(
        this.i18n.t(`${AUTH_I18N}.${AuthUnauthorized.TokenFailureOrValidationFailure}`),
      );
    }
  }

  async verifyTokens(input: VerifyTokenInput) {
    const result: VerifyTokenOutput = {};
    if (input.accessToken) {
      result.accessToken = !!(await this.verifyToken(
        'accessToken',
        input.accessToken,
        JWT_CONSTANTS.secret,
      ));
    }
    if (input.refreshToken) {
      result.refreshToken = !!(await this.verifyToken(
        'refreshToken',
        input.refreshToken,
        JWT_CONSTANTS.refreshSecret,
      ));
    }

    return result;
  }

  async verifyToken(key: string, token: string, secret: string) {
    if (!token) {
      return null;
    }
    try {
      const info = await this.jwtService.verifyAsync<AuthPayload>(token, {
        secret,
      });
      const { id } = info;
      let rtoken = await this.redisService.get(`${AUTH}:${id}:${key}`);
      if (rtoken === token) {
        return info;
      } else {
        return null;
      }
    } catch (e) {
      return null;
    }
  }

  extractTokenFromHeader(headers: IncomingHttpHeaders): string | undefined {
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }

  private async createTokens(payload: AuthPayload, refresh = false): Promise<Auth> {
    const accessToken = await this.createToken(
      'accessToken',
      payload,
      JWT_CONSTANTS.secret,
      JWT_CONSTANTS.expiresIn,
      refresh,
    );
    const refreshToken = await this.createToken(
      'refreshToken',
      payload,
      JWT_CONSTANTS.refreshSecret,
      JWT_CONSTANTS.refreshExpiresIn,
      refresh,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async createToken(
    key: string,
    payload: AuthPayload,
    secret: string,
    expiresIn: string,
    refresh = false,
  ) {
    const { id } = payload;
    let token = await this.redisService.get(`${AUTH}:${id}:${key}`);
    if (!token || refresh) {
      token = this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: expiresIn,
      });
      await this.redisService.set(`${AUTH}:${id}:${key}`, token, 'PX', ms(expiresIn));
    }
    return token;
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
