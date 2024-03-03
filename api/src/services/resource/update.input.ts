import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, i18n } from '@api/core';
import { ResourceDescription, ResourceI18n } from './resource.enum';

@InputType()
export class UpdateResourceInput {
  @Field(() => ID, { description: ResourceDescription.Id })
  @IsNotEmpty({
    message: i18n(`${ResourceI18n}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: ResourceDescription.Name, nullable: null })
  @IsOptional()
  @IsExist('resource', {
    message: i18n(`${ResourceI18n}.${ResourceDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: ResourceDescription.Code, nullable: null })
  @IsOptional()
  @IsExist('resource', {
    message: i18n(`${ResourceI18n}.${ResourceDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: ResourceDescription.Sort, nullable: null })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: i18n(
        `${ResourceI18n}.${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort?: number;

  @Field({ description: ResourceDescription.Description, nullable: null })
  @IsOptional()
  description?: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: null })
  @IsOptional()
  @IsNotExist('resource', {
    message: i18n(`${ResourceI18n}.${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  pid?: string;
}
