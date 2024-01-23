import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsExist, ValidatorDescription } from '@api/core';
import { PermissionDescription } from './permission.enum';

@InputType()
export class UpdatePermissionInput {
  @Field(() => ID, { description: PermissionDescription.Id })
  @IsNotEmpty({ message: `${PermissionDescription.Id}${ValidatorDescription.NotEmpty}` })
  id: string;

  @Field({ description: PermissionDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${PermissionDescription.Name}${ValidatorDescription.NotEmpty}` })
  name?: string;

  @Field({ description: PermissionDescription.Code, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${PermissionDescription.Code}${ValidatorDescription.NotEmpty}` })
  code?: string;

  @Field({ description: PermissionDescription.Sort, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${PermissionDescription.Sort}${ValidatorDescription.NotEmpty}` })
  sort?: number;

  @Field({ description: PermissionDescription.Description, nullable: true })
  @IsOptional()
  description?: string;
}
