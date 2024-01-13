import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ResourceDescription } from '../enum';
import { BaseDescription, IsExist, IsNotExist, ValidatorDescription } from '@api/core';

@InputType()
export class UpdateResourceInput {
  @Field(() => ID, { description: BaseDescription.Id })
  @IsNotEmpty({ message: `${BaseDescription.Id}${ValidatorDescription.NotEmpty}` })
  id: string;

  @Field({ description: ResourceDescription.Name })
  @IsOptional()
  @IsExist('resource', { message: `${ResourceDescription.Name}${ValidatorDescription.IsExist}` })
  name?: string;

  @Field({ description: ResourceDescription.Code })
  @IsOptional()
  @IsExist('resource', { message: `${ResourceDescription.Code}${ValidatorDescription.IsExist}` })
  code?: string;

  @Field({ description: ResourceDescription.Pid })
  @IsOptional()
  @IsNotExist('resource', { message: `${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`, context: { relation: 'id' } })
  pid?: string;
}