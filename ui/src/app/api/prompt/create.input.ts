export class PromptCreateInput {
  name!: string;
  prompt!: string;
  system?: string;
  code!: string;
  platform!: string;
  promptVars?: any[];
  description?: string;
}
