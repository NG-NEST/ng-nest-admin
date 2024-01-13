import { ID, registerEnumType } from '@nestjs/graphql';

export enum SortOrder {
  asc = 'asc',
  desc = 'desc'
}

registerEnumType(SortOrder, { name: 'SortOrder' });

export enum PaginationDescription {
  Skip = '索引开始位置，默认从 0 开始',
  Take = '查询的数据条数，默认 10 条数据',
  OrderBy = '排序规则',
  Where = '查询条件',
  Include = '包含关联对象',

  Count = '总数',
  Data = '数据集合'
}

export enum ValidatorDescription {
  NotEmpty = '不能为空',
  IsExist = '已存在',
  IsNotExist = '不存在'
}

export enum BaseDescription {
  Id = '编码',
  CreatedAt = '创建时间',
  UpdatedAt = '更新时间'
}

export enum IncludeDescription {
  Include = '关联对象'
}

export enum WhereDescription {
  AND = '与关系，所有的条件都返回 true',
  OR = '或关系，满足一个或多个条件就返回 true',
  NOT = '非关系，所有的条件都返回 false',

  Equals = '等于给定的值',
  In = '在给定的值当中',
  NotIn = '不在给定的值当中',
  Lt = '小于给定的值',
  Lte = '小于等于给定的值',
  Gt = '大于给定的值',
  Gte = '大于等于给定的值',
  Not = '不等于给定的值',

  Contains = '包含给定的值',
  StartsWith = '开始字符包含给定值',
  EndsWith = '结束字符包含给定值'
}

export const BaseID = { type: () => ID, description: BaseDescription.Id };
