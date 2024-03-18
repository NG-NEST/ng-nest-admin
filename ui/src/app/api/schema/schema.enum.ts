export const SchemaI18n = 'schema';

export enum SchemaAuth {
  SchemaCreate = 'schema-create',
  SchemaUpdate = 'schema-update',
  SchemaDelete = 'schema-delete'
}

export enum SchemaDescription {
  Schema = 'Schema',

  Id = 'SchemaId',
  Name = 'Name',
  Code = 'Code',
  Json = 'Json'
}

export enum SchemaMessage {
  CreatedSuccess = '新增数据结构成功',
  UpdatedSuccess = '更新数据结构成功',
  DeletedSuccess = '删除数据结构成功'
}
