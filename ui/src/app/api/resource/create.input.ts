export class ResourceCreateInput {
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  subjectId!: string;
  pid?: string;
}
