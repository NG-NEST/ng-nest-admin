import { BaseWhereInput, StringFilter } from '@ui/core';

export class ModelWhereInput extends BaseWhereInput<ModelWhereInput> {
  name?: StringFilter;
  code?: StringFilter;
  platform?: StringFilter;
  description?: StringFilter;
}
