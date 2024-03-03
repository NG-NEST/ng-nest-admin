import { ArgsType, Field } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';
import { GraphQLJWT } from 'graphql-scalars';
import { AuthDescription, AuthI18n } from './auth.enum';
import { ValidatorDescription, i18n } from '@api/core';

@ArgsType()
export class RefreshTokenInput {
  @Field(() => GraphQLJWT, { description: AuthDescription.RefreshToken })
  @IsNotEmpty({
    message: i18n(`${AuthI18n}.${AuthDescription.RefreshToken}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsJWT({
    message: i18n(`${AuthI18n}.${AuthDescription.RefreshToken}${ValidatorDescription.IsJWT}`),
  })
  refreshToken: string;
}
