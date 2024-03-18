import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class UserSelectOutput extends User {}
