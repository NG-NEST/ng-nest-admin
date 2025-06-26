import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { IsNotExist, ValidatorDescription, I18N } from '@api/core';
import { CatalogueDescription, CATALOGUE_I18N, CatalogueFileType } from './catalogue.enum';
import { CatalogueType } from '@prisma/client';
import { VariableDescription } from '../variable';

@InputType()
export class CatalogueUpdateInput {
  @Field(() => ID, { description: CatalogueDescription.Id })
  @IsNotEmpty({
    message: I18N(`${CATALOGUE_I18N}.${CatalogueDescription.Id}${ValidatorDescription.IsNotEmpty}`),
  })
  id: string;

  @Field({ description: CatalogueDescription.Name, nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => String, { description: CatalogueDescription.Type, nullable: true })
  @IsOptional()
  type?: CatalogueType;

  @Field(() => Boolean, { description: CatalogueDescription.Many, nullable: true })
  @IsOptional()
  many?: boolean;

  @Field(() => String, { description: CatalogueDescription.FileType, nullable: true })
  @IsOptional()
  fileType?: CatalogueFileType;

  @Field({ description: CatalogueDescription.Sort, nullable: true })
  @IsOptional()
  @IsNumber(
    {},
    {
      message: I18N(
        `${CATALOGUE_I18N}.${CatalogueDescription.Sort}${ValidatorDescription.IsNotNumber}`,
      ),
    },
  )
  sort?: number;

  @Field({ description: CatalogueDescription.Description, nullable: true })
  @IsOptional()
  description?: string;

  @Field({ description: CatalogueDescription.Content, nullable: true })
  @IsOptional()
  content?: string;

  @Field({ description: CatalogueDescription.Url, nullable: true })
  @IsOptional()
  url?: string;

  @Field(() => ID, { description: CatalogueDescription.Pid, nullable: true })
  @IsOptional()
  @IsNotExist('catalogue', {
    message: I18N(
      `${CATALOGUE_I18N}.${CatalogueDescription.Pid}${ValidatorDescription.IsNotExist}`,
    ),
    context: { relation: 'id' },
  })
  pid?: string;

  @Field({ description: VariableDescription.Id, nullable: true })
  @IsOptional()
  @IsNotExist('variable', {
    message: I18N(`${CATALOGUE_I18N}.${VariableDescription.Id}${ValidatorDescription.IsNotExist}`),
    context: { relation: 'id' },
  })
  variableId?: string;
}
