import { ObjectType } from '@nestjs/graphql';
import { Permission } from '../permission';

@ObjectType()
export class RolePermissionOutput extends Permission {}
