import { ID } from '@nestjs/graphql';
export const PROMPT_I18N = 'prompt';

export enum PromptAuth {
  PromptCreate = 'prompt-create',
  PromptUpdate = 'prompt-update',
  PromptDelete = 'prompt-delete',
}

export enum PromptDescription {
  Prompt = 'Prompt',

  Id = 'PromptId',
  Name = 'Name',
  User = 'User',
  System = 'System',
  ModelId = 'ModelId',
  ModelType = 'ModelType',
  UserVars = 'UserVars',
  Description = 'Description',
}

export enum PromptResolverName {
  Prompt = 'Prompt',
  Prompts = 'Prompts',
  PromptSelect = 'PromptSelect. No Pagination',
  CreatePrompt = 'CreatePrompt',
  UpdatePrompt = 'UpdatePrompt',
  DeletePrompt = 'DeletePrompt',
}

export enum PromptCache {
  Prompt = 'Prompt',
  Prompts = 'Prompts',
  PromptSelect = 'PromptSelect',
}

export const PromptCacheClear = Object.keys(PromptCache);

export const PromptId = { type: () => ID, description: PromptDescription.Id };
