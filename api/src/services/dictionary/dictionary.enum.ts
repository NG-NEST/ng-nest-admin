import { ID } from '@nestjs/graphql';
export const DictionaryI18n = 'dictionary';

export enum DictionaryAuth {
  DictionaryCreate = 'dictionary-create',
  DictionaryUpdate = 'dictionary-update',
  DictionaryDelete = 'dictionary-delete',
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
  Children = 'Children',
}

export enum DictionaryResolverName {
  Dictionary = 'Dictionary',
  Dictionaries = 'Dictionaries',
  DictionarySelect = 'DictionarySelect. No Pagination',
  CreateDictionary = 'CreateDictionary',
  UpdateDictionary = 'UpdateDictionary',
  DeleteDictionary = 'DeleteDictionary',
}

export const DictionaryId = { type: () => ID, description: DictionaryDescription.Id };
