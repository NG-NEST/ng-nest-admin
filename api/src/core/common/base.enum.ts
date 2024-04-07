import { registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, { name: 'SortOrder' });

export enum PaginationDescription {
  Skip = 'Index starting position, default is 0',
  Take = 'Number of data items to retrieve, default is 10',
  OrderBy = 'Sorting rule',
  Where = 'Query condition',
  Include = 'Includes associated objects',

  Count = 'Total count',
  Data = 'Data collection',
}

export enum ValidatorDescription {
  IsNotEmpty = 'IsNotEmpty',
  IsString = 'IsString',
  IsExist = 'IsExist',
  IsNotExist = 'IsNotExist',
  IsNotNumber = 'IsNotNumber',
  IsJWT = 'IsJWT',
  IsIn = 'IsIn',
  IsUUID = 'IsUUID',
}

export enum BaseDescription {
  Id = 'Id',
  CreatedAt = 'CreatedAt',
  UpdatedAt = 'UpdatedAt',
}

export enum IncludeDescription {
  Include = 'Include object',
}

export enum WhereDescription {
  AND = 'Logical AND, returns true if all conditions are true',
  OR = 'Logical OR, returns true if one or more conditions are met',
  NOT = 'Logical NOT, returns false if all conditions are true',

  Equals = 'Equals the given value',
  In = 'Is in the given set of values',
  NotIn = 'Is not in the given set of values',
  Lt = 'Less than the given value',
  Lte = 'Less than or equal to the given value',
  Gt = 'Greater than the given value',
  Gte = 'Greater than or equal to the given value',
  Not = 'Does not equal the given value',

  Contains = 'Contains the given value',
  StartsWith = 'Starts with the given value',
  EndsWith = 'Ends with the given value',
}
