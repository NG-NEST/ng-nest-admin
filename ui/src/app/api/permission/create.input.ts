export class PermissionCreateInput {
  name!: string;
  code!: string;
  sort!: number;
  description?: string;
  resourceId!: string;
}
