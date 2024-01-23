export class CreateResourceInput {
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  subjectId!: string;
  pid?: string;
}
