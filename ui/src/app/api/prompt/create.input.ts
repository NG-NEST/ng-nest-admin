export class PromptCreateInput {
  name!: string;
  user!: string;
  system?: string;
  modelType!: string;
  modelId!: string;
  userVars?: any[];
  description?: string;
}
