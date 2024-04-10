import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsExist, IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { ResourceDescription, RESOURCE_I18N } from './resource.enum';

@InputType()
export class ResourceUpdateInput {
  @Field(() => ID, { description: ResourceDescription.Id })
  @IsNotEmpty({
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: ResourceDescription.Name, nullable: true })
  @IsOptional()
  @IsExist('resource', {
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Name}${ValidatorDescription.IsExist}`),
  })
  name?: string;

  @Field({ description: ResourceDescription.Code, nullable: true })
  @IsOptional()
  @IsExist('resource', {
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Code}${ValidatorDescription.IsExist}`),
  })
  code?: string;

  @Field({ description: ResourceDescription.Sort, nullable: true })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: I18N(
        `${RESOURCE_I18N}.${ResourceDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort?: number;

  @Field({ description: ResourceDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => ID, { description: ResourceDescription.Pid, nullable: true })
  @IsOptional()
  @IsNotExist('resource', {
    message: I18N(`${RESOURCE_I18N}.${ResourceDescription.Pid}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  pid?: string;
}
