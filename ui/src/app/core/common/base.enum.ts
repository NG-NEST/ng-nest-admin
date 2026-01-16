export type SortOrder = 'asc' | 'desc';

export enum PaginationDescription {
  Skip = 'skip',
  Take = 'take',
  OrderBy = 'orderBy',
  Where = 'where',
  Include = 'include',

  Count = 'count',
  Data = 'data'
}

export enum ValidatorDescription {
  NotEmpty = 'notEmpty',
  IsExist = 'isExist',
  IsNotExist = 'isNotExist',
  IsNotNumber = 'isNotNumber'
}

export enum BaseDescription {
  Id = 'id',
  Index = 'index',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt',
  Operate = 'operate'
}

export enum WhereDescription {
  AND = 'and',
  OR = 'or',
  NOT = 'not',

  Equals = 'equals',
  In = 'in',
  NotIn = 'notIn',
  Lt = 'lt',
  Lte = 'lte',
  Gt = 'gt',
  Gte = 'gte',
  Not = 'not',

  Contains = 'contains',
  StartsWith = 'startsWith',
  EndsWith = 'endsWith'
}
