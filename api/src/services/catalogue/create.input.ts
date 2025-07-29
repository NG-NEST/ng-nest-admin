import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { CatalogueDescription, CATALOGUE_I18N, CatalogueFileType } from './catalogue.enum';
import { CatalogueType } from '@prisma/client';
import { ResourceDescription } from '../resource';
import { VariableDescription } from '../variable';
@InputType()
export class CatalogueCreateInput {
  @Field({ description: CatalogueDescription.Name })
  @IsNotEmpty({
    message: I18N(
      `${CATALOGUE_I18N}.${CatalogueDescription.Name}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  name: string;

  @Field(() => String, { description: CatalogueDescription.Type })
  @IsNotEmpty({
    message: I18N(
      `${CATALOGUE_I18N}.${CatalogueDescription.Type}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  type: CatalogueType;

  @Field(() => String, { description: CatalogueDescription.FileType, nullable: true })
  @IsOptional()
  fileType?: CatalogueFileType;

  @Field({ description: CatalogueDescription.Sort })
  @IsNotEmpty({
    message: I18N(
      `${CATALOGUE_I18N}.${CatalogueDescription.Sort}${ValidatorDescription.IsNotEmpty}`,
    ),
  })
  @IsNumber(
    {},
    {
      message: I18N(
        `${CATALOGUE_I18N}.${CatalogueDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort: number;

  @Field({ description: CatalogueDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: CatalogueDescription.Content, nullable: true })
  @IsOptional()
  content?: string;

  @Field({ description: CatalogueDescription.Url, nullable: true })
  @IsOptional()
  url?: string;

  @Field({ description: ResourceDescription.Id })
  @IsNotEmpty({
    message: I18N(`${CATALOGUE_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  @IsNotExist('resource', {
    message: I18N(`${CATALOGUE_I18N}.${ResourceDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  resourceId: string;

  @Field(() => ID, { description: CatalogueDescription.Pid, nullable: true })
  @IsOptional()
  @IsNotExist('catalogue', {
    message: I18N(
      `${CATALOGUE_I18N}.${CatalogueDescription.Pid}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  pid?: string;

  @Field(() => Boolean, { description: CatalogueDescription.Many, nullable: true })
  @IsOptional()
  many?: boolean;

  @Field({ description: VariableDescription.Id, nullable: true })
  @IsOptional()
  @IsNotExist('variable', {
    message: I18N(`${CATALOGUE_I18N}.${VariableDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  variableId?: string;
}
