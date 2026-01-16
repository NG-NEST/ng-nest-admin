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
  CreatedSuccess = 'createdSuccess',
  UpdatedSuccess = 'updatedSuccess',
  DeletedSuccess = 'deletedSuccess'
}
