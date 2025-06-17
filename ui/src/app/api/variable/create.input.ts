export class VariableCreateInput {
  code!: string;
  type?: string;
  value?: number;
  description?: string;
  resourceId!: string;
  variableCategoryId!: string;
}
