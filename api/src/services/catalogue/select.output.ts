import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Catalogue } from './catalogue.model';
import { CatalogueDescription, CatalogueFileType } from './catalogue.enum';
import { BaseAudit } from '@api/core';
import { IsOptional } from 'class-validator';
import { CatalogueType } from '@prisma/client';

@ObjectType()
export class CatalogueSelectOutput extends BaseAudit {
  @Field(() => ID, { description: CatalogueDescription.Id })
  id: string;

  @Field(() => ID, { description: CatalogueDescription.Pid, nullable: true })
  @IsOptional()
  pid?: string;

  @Field(() => Catalogue, { description: CatalogueDescription.Parent, nullable: true })
  @IsOptional()
  parent?: Catalogue;

  @Field(() => [Catalogue], { description: CatalogueDescription.Children, nullable: true })
  @IsOptional()
  children?: Catalogue[];

  @Field({ description: CatalogueDescription.Name })
  name: string;

  @Field(() => String, { description: CatalogueDescription.Type })
  type: CatalogueType;

  @Field(() => String, { description: CatalogueDescription.FileType })
  fileType?: CatalogueFileType;

  @Field({ description: CatalogueDescription.Sort })
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
}
