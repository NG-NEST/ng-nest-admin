import { BaseWhereInput, StringFilter } from '@ui/core';

export class PromptWhereInput extends BaseWhereInput<PromptWhereInput> {
  name?: StringFilter;
  user?: StringFilter;
  system?: StringFilter;
  modelId?: StringFilter;
  userVars?: StringFilter;
  description?: StringFilter;
}
