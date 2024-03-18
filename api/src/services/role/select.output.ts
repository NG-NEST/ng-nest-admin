import { ObjectType } from '@nestjs/graphql';
import { Role } from './role.model';

@ObjectType()
export class RoleSelectOutput extends Role {}
