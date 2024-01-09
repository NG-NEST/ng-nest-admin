import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDescription } from '../enum';
import { BaseDescription, IsExist, ValidatorDescription } from '@api/core';
import { RoleDescription } from '../../role';

@InputType()
export class UpdateUserInput {
  @Field(() => ID, { description: BaseDescription.Id })
  @IsNotEmpty({ message: `${BaseDescription.Id}${ValidatorDescription.NotEmpty}` })
  id: string;

  @Field({ description: UserDescription.Name, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${UserDescription.Name}${ValidatorDescription.NotEmpty}` })
  @IsExist('user', { message: `${UserDescription.Name}${ValidatorDescription.IsExist}` })
  name?: string;

  @Field({ description: UserDescription.Email, nullable: true })
  @IsOptional()
  @IsNotEmpty({ message: `${UserDescription.Email}${ValidatorDescription.NotEmpty}` })
  @IsExist('user', { message: `${UserDescription.Email}${ValidatorDescription.IsExist}` })
  email?: string;

  @Field({ description: UserDescription.Phone, nullable: true })
  @IsOptional()
  @IsExist('user', { message: `${UserDescription.Phone}${ValidatorDescription.IsExist}` })
  phone?: string;

  @Field(() => [ID], { description: RoleDescription.Role })
  @IsOptional()
  roleIds?: string[];
}
