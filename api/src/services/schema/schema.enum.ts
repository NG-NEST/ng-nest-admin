import { ID } from '@nestjs/graphql';
export const SchemaI18n = 'schema';

export enum SchemaAuth {
  SchemaCreate = 'schema-create',
  SchemaUpdate = 'schema-update',
  SchemaDelete = 'schema-delete',
}

export enum SchemaDescription {
  Schema = 'Schema',

  Id = 'SchemaId',
  Name = 'Name',
  Code = 'Code',
  Json = 'Json',
}

export enum SchemaResolverName {
  Schema = 'Schema',
  Schemas = 'Schemas',
  SchemaSelect = 'SchemaSelect. No Pagination',
  CreateSchema = 'CreateSchema',
  UpdateSchema = 'UpdateSchema',
  DeleteSchema = 'DeleteSchema',
}

export const SchemaId = { type: () => ID, description: SchemaDescription.Id };
