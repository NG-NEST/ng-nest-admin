import { Field, InputType } from '@nestjs/graphql';
import { Permission } from './permission.model';
import { PermissionDescription } from './permission.enum';

@InputType()
export class PermissionSaveManyInput {
  @Field({ description: PermissionDescription.Many })
  many: Permission[];

  @Field({ description: PermissionDescription.ResourceId })
  resourceId: string;
}
