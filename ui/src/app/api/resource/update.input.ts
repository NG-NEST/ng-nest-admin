import { ResourceCode } from './resource.model';

export class ResourceUpdateInput {
  id!: string;
  type?: string;
  icon?: string;
  name!: string;
  code!: ResourceCode;
  sort!: number;
  description?: string;
  subjectId!: string;
  pid?: string;
}
