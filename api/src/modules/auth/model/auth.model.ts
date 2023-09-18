import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';
import { AuthDescription } from '../enum';

@ObjectType()
export class Auth {
  @Field(() => GraphQLJWT, { description: AuthDescription.AccessToken })
  accessToken: string;

  @Field(() => GraphQLJWT, { description: AuthDescription.RefreshToken })
  refreshToken: string;
}
