import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard, AuthService, JWT_CONSTANTS, JwtGuard } from '@api/services';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANTS.secret,
      signOptions: {
        expiresIn: JWT_CONSTANTS.expiresIn,
      },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    { provide: APP_GUARD, useClass: JwtGuard },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
