import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyTokenOutput {
  accessToken?: boolean;
  refreshToken?: boolean;
}
