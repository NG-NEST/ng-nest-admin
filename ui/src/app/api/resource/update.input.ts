export class UpdateResourceInput {
  id!: string;
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  subjectId!: string;
  pid?: string;
}
