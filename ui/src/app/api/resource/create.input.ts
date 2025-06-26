import { ResourceCode } from './resource.model';

export class ResourceCreateInput {
  type?: string;
  icon?: string;
  name!: string;
  code!: ResourceCode;
  sort!: number;
  description?: string;
  subjectId!: string;
  pid?: string;
}
