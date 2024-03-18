export enum DictionaryAuth {
  DictionaryCreate = 'dictionary-create',
  DictionaryUpdate = 'dictionary-update',
  DictionaryDelete = 'dictionary-delete'
}

export enum DictionaryDescription {
  Dictionary = 'Dictionary',

  Id = 'DictionaryId',
  Pid = 'Pid',
  Name = 'Name',
  Code = 'Code',
  Sort = 'Sort',
  Description = 'Description',

  Parent = 'Parent',
  Children = 'Children'
}

export enum DictionaryMessage {
  CreatedSuccess = '新增字典成功',
  UpdatedSuccess = '更新字典成功',
  DeletedSuccess = '删除字典成功'
}
