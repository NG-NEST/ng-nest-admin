import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';
import { AuthDescription, AuthI18n } from './auth.enum';
import { IsJWT, IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, i18n } from '@api/core';

@ArgsType()
export class VerifyTokenInput {
  @Field(() => GraphQLJWT, { description: AuthDescription.AccessToken })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${AuthI18n}.${AuthDescription.AccessToken}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJWT({
    message: i18n(`${AuthI18n}.${AuthDescription.AccessToken}${ValidatorDescription.IsJWT}`),
  })
  accessToken?: string;

  @Field(() => GraphQLJWT, { description: AuthDescription.RefreshToken })
  @IsOptional()
  @IsNotEmpty({
    message: i18n(`${AuthI18n}.${AuthDescription.RefreshToken}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJWT({
    message: i18n(`${AuthI18n}.${AuthDescription.RefreshToken}${ValidatorDescription.IsJWT}`),
  })
  refreshToken?: string;
}
