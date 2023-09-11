import { ObjectType } from "@nestjs/graphql";
import { Token } from "./token.model";
import { User } from "@api/modules";

@ObjectType()
export class Auth extends Token {
  user: User;
}
