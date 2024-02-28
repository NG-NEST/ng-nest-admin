import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription } from '@api/core';
import { ResourceDescription } from './resource.enum';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class UpdateResourceInput {
  @Field(() => ID, { description: ResourceDescription.Id })
  @IsNotEmpty({
    message: i18nValidationMessage(`${ResourceDescription.Id}${ValidatorDescription.NotEmpty}`),
  })
  id: string;

  @Field({ description: ResourceDescription.Name, nullable: null })
  @IsOptional()
  @IsExist('resource', { message: `${ResourceDescription.Name}${ValidatorDescription.IsExist}` })
  name?: string;

  @Field({ description: ResourceDescription.Code, nullable: null })
  @IsOptional()
  @IsExist('resource', { message: `${ResourceDescription.Code}${ValidatorDescription.IsExist}` })
  code?: string;

  @Field({ description: ResourceDescription.Sort, nullable: null })
  @IsOptional()
  @IsNumber({}, { message: `${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}` })
  sort?: number;

  @Field({ description: ResourceDescription.Description, nullable: null })
  @IsOptional()
  description?: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: null })
  @IsOptional()
  @IsNotExist('resource', {
    message: `${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`,
    context: { relation: 'id' },
  })
  pid?: string;
}
