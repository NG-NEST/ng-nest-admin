import { ArgsType, Field } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';
import { AuthDescription, AUTH_I18N } from './auth.enum';
import { IsJWT, IsNotEmpty, IsOptional } from 'class-validator';
import { ValidatorDescription, I18N } from '@api/core';

@ArgsType()
export class VerifyTokenInput {
  @Field(() => GraphQLJWT, { description: AuthDescription.AccessToken })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${AUTH_I18N}.${AuthDescription.AccessToken}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJWT({
    message: I18N(`${AUTH_I18N}.${AuthDescription.AccessToken}${ValidatorDescription.IsJWT}`),
  })
  accessToken?: string;

  @Field(() => GraphQLJWT, { description: AuthDescription.RefreshToken })
  @IsOptional()
  @IsNotEmpty({
    message: I18N(`${AUTH_I18N}.${AuthDescription.RefreshToken}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJWT({
    message: I18N(`${AUTH_I18N}.${AuthDescription.RefreshToken}${ValidatorDescription.IsJWT}`),
  })
  refreshToken?: string;
}
