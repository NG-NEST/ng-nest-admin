export class VariableCreateInput {
  code!: string;
  type?: string;
  value?: string;
  sort?: number;
  description?: string;
  resourceId!: string;
  variableCategoryId!: string;
}
