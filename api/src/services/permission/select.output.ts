import { ObjectType } from '@nestjs/graphql';
import { Permission } from './permission.model';

@ObjectType()
export class PermissionSelectOutput extends Permission {}
