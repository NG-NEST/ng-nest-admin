import { ID } from '@nestjs/graphql';

export enum SubjectDescription {
  Subject = '主体',

  Id = '主体编码',
  Name = '主体名称',
  Code = '主体标识',
  Description = '主体描述'
}

export enum SubjectIncludeDescription {
  SubjectResource = '主体资源'
}

export enum SubjectResolverName {
  Subject = '主体详情',
  Subjects = '主体列表',
  SubjectSelect = '主体查询（没有分页）',
  SubjectResources = '主体对应的资源（没有分页）',
  CreateSubject = '创建主体',
  UpdateSubject = '更新主体',
  DeleteSubject = '删除主体'
}

export const SubjectId = { type: () => ID, description: SubjectDescription.Id };
export const SubjectCode = { description: SubjectDescription.Code };
