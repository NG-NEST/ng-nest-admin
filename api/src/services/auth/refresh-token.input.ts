import { ArgsType, Field } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { GraphQLJWT } from 'graphql-scalars';
import { AuthDescription, AUTH_I18N } from './auth.enum';
import { ValidatorDescription, I18N } from '@api/core';

@ArgsType()
export class RefreshTokenInput {
  @Field(() => GraphQLJWT, { description: AuthDescription.RefreshToken })
  @IsNotEmpty({
    message: I18N(`${AUTH_I18N}.${AuthDescription.RefreshToken}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJWT({
    message: I18N(`${AUTH_I18N}.${AuthDescription.RefreshToken}${ValidatorDescription.IsJWT}`),
  })
  refreshToken: string;
}
