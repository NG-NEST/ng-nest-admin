import { ID } from '@nestjs/graphql';
export const LanguageI18n = 'language';

export enum LanguageAuth {
  LanguageCreate = 'language-create',
  LanguageUpdate = 'language-update',
  LanguageDelete = 'language-delete',
}

export enum LanguageDescription {
  Language = 'Language',

  Id = 'LanguageId',
  Key = 'Key',
  Value = 'Value',
  LanguageCode = 'LanguageCode',
}

export enum LanguageResolverName {
  Language = 'Language',
  Languages = 'Languages',
  LanguageSelect = 'LanguageSelect. No Pagination',
  CreateLanguage = 'CreateLanguage',
  UpdateLanguage = 'UpdateLanguage',
  DeleteLanguage = 'DeleteLanguage',
}

export const LanguageId = { type: () => ID, description: LanguageDescription.Id };
