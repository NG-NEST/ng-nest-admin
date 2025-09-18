import { BaseWhereInput, StringFilter } from '@ui/core';

export class PromptWhereInput extends BaseWhereInput<PromptWhereInput> {
  name?: StringFilter;
  prompt?: StringFilter;
  system?: StringFilter;
  code?: StringFilter;
  platform?: StringFilter;
  promptVars?: StringFilter;
  description?: StringFilter;
}
