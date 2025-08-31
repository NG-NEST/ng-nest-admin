import { BaseWhereInput, StringFilter } from '@ui/core';

export class ModelWhereInput extends BaseWhereInput<ModelWhereInput> {
  name?: StringFilter;
  type?: StringFilter;
  description?: StringFilter;
}
