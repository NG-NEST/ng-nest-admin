import { ID } from '@nestjs/graphql';
export const SUBJECT_I18N = 'subject';

export enum SubjectAuth {
  SubjectCreate = 'subject-create',
  SubjectUpdate = 'subject-update',
  SubjectDelete = 'subject-delete',
}

export enum SubjectDescription {
  Subject = 'Subject',

  Id = 'SubjectId',
  Name = 'Name',
  Code = 'Code',
  Description = 'Description',
}

export enum SubjectIncludeDescription {
  SubjectResources = 'SubjectResources',
}

export enum SubjectResolverName {
  Subject = 'Subject',
  Subjects = 'Subjects',
  SubjectSelect = 'SubjectSelect. No Pagination',
  SubjectResources = 'SubjectResources. No Pagination',
  CreateSubject = 'CreateSubject',
  UpdateSubject = 'UpdateSubject',
  DeleteSubject = 'DeleteSubject',
}

export enum SubjectCache {
  Subject = 'Subject',
  Subjects = 'Subjects',
  SubjectSelect = 'SubjectSelect',
  SubjectResources = 'SubjectResources',
}

export const SubjectCacheClear = Object.keys(SubjectCache);

export const SubjectId = { type: () => ID, description: SubjectDescription.Id };
export const SubjectCode = { description: SubjectDescription.Code };
