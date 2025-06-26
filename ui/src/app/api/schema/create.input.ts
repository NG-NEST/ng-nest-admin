export class SchemaCreateInput {
  name!: string;
  code!: string;
  description?: string;
  version?: string;
  json!: object;
}
