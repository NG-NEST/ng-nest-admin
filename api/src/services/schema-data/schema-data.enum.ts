import { ID } from '@nestjs/graphql';
export const SCHEMA_DATA_I18N = 'schema-data';

export enum SchemaDataAuth {
  SchemaDataCreate = 'schema-data-create',
  SchemaDataUpdate = 'schema-data-update',
  SchemaDataDelete = 'schema-data-delete',
}

export enum SchemaDataDescription {
  SchemaData = 'SchemaData',

  Id = 'SchemaDataId',
  FormId = 'FormId',
  Data = 'Data',
}

export enum SchemaDataResolverName {
  SchemaData = 'SchemaData',
  SchemaDatas = 'SchemaDatas',
  SchemaDataSelect = 'SchemaDataSelect. No Pagination',
  CreateSchemaData = 'CreateSchemaData',
  UpdateSchemaData = 'UpdateSchemaData',
  DeleteSchemaData = 'DeleteSchemaData',
}

export enum SchemaDataCache {
  SchemaData = 'SchemaData',
  SchemaDatas = 'SchemaDatas',
  SchemaDataSelect = 'SchemaDataSelect',
}

export enum SchemaDataException {}

export const SchemaDataCacheClear = Object.keys(SchemaDataCache);

export const SchemaDataId = { type: () => ID, description: SchemaDataDescription.Id };
