import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJWT } from 'graphql-scalars';
import { TokenDescription } from '../enum';

@ObjectType()
export class Token {
  @Field(() => GraphQLJWT, { description: TokenDescription.AccessToken })
  accessToken: string;

  @Field(() => GraphQLJWT, { description: TokenDescription.RefreshToken })
  refreshToken: string;
}
