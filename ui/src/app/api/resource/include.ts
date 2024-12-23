import { PermissionOrderInput, PermissionWhereInput } from '../permission';

class PermissionsInclude {
  where?: PermissionWhereInput;
  orderBy?: PermissionOrderInput[];
}

export class ResourceIncludeInput {
  permissions?: PermissionsInclude;
}
