import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService, JwtAuthGuard, RoutesGuard, jwtConstants } from '@api/services';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: jwtConstants.expiresIn,
      },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    { provide: APP_GUARD, useValue: JwtAuthGuard },
    {
      provide: APP_GUARD,
      useClass: RoutesGuard,
    },
  ],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
