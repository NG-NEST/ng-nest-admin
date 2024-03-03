import { ID } from '@nestjs/graphql';
export const SubjectI18n = 'subject';

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
  SubjectResource = 'SubjectResource',
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

export const SubjectId = { type: () => ID, description: SubjectDescription.Id };
export const SubjectCode = { description: SubjectDescription.Code };
