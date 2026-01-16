export const SchemaI18n = 'schema';

export enum SchemaAuth {
  SchemaCreate = 'schema-create',
  SchemaUpdate = 'schema-update',
  SchemaDelete = 'schema-delete'
}

export enum SchemaDescription {
  Schema = 'Schema',

  Id = 'SchemaId',
  Name = 'name',
  Code = 'code',
  Description = 'description',
  Version = 'version',
  Json = 'json'
}

export enum SchemaMessage {
  CreatedSuccess = 'createdSuccess',
  UpdatedSuccess = 'updatedSuccess',
  DeletedSuccess = 'deletedSuccess'
}
