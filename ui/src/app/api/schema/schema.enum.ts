export const SchemaI18n = 'schema';

export enum SchemaAuth {
  SchemaCreate = 'schema-create',
  SchemaUpdate = 'schema-update',
  SchemaDelete = 'schema-delete'
}

export enum SchemaDescription {
  Schema = 'Schema',

  Id = 'SchemaId',
  Name = '名称',
  Code = '编码',
  Description = '描述',
  Version = '版本',
  Json = '模型数据'
}

export enum SchemaMessage {
  CreatedSuccess = '新增数据模型成功',
  UpdatedSuccess = '更新数据模型成功',
  DeletedSuccess = '删除数据模型成功'
}
