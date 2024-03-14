export class ResourceUpdateInput {
  id!: string;
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  subjectId!: string;
  pid?: string;
}
