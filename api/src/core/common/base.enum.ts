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

  Count = '总数',
  Data = '数据集合'
}

export enum ValidatorDescription {
  NotEmpty = '不能为空！'
}

export enum BaseDescription {
  Id = '编码',
  CreatedAt = '创建时间',
  UpdatedAt = '更新时间'
}

export const BaseID = { type: () => ID, description: BaseDescription.Id };
