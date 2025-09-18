import { ID } from '@nestjs/graphql';
export const MODEL_I18N = 'model';

export enum ModelAuth {
  ModelCreate = 'model-create',
  ModelUpdate = 'model-update',
  ModelDelete = 'model-delete',
}

export enum ModelDescription {
  Model = 'Model',

  Id = 'ModelId',
  Name = 'Name',
  Code = 'Code',
  Platform = 'Platform',
  Description = 'Description',
}

export enum ModelResolverName {
  Model = 'Model',
  Models = 'Models',
  ModelSelect = 'ModelSelect. No Pagination',
  CreateModel = 'CreateModel',
  UpdateModel = 'UpdateModel',
  DeleteModel = 'DeleteModel',
}

export enum ModelCache {
  Model = 'Model',
  Models = 'Models',
  ModelSelect = 'ModelSelect',
}

export const ModelCacheClear = Object.keys(ModelCache);

export const ModelId = { type: () => ID, description: ModelDescription.Id };
