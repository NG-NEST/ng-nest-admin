import { ArgsType, Field } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { GraphQLJWT } from 'graphql-scalars';
import { AuthDescription, AuthI18n } from './auth.enum';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ValidatorDescription } from '@api/core';

@ArgsType()
export class RefreshTokenInput {
  @Field(() => GraphQLJWT, { description: AuthDescription.RefreshToken })
  @IsNotEmpty({
    message: i18nValidationMessage(`${AuthI18n}.${AuthDescription.RefreshToken}${ValidatorDescription.NotEmpty}`),
  })
  @IsJWT({
    message: i18nValidationMessage(`${AuthI18n}.${AuthDescription.RefreshToken}${ValidatorDescription.JwtString}`),
  })
  refreshToken: string;
}
