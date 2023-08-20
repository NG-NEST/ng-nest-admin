export class UserInclude {
  role?: boolean;
}

export class UserRoleInclude {
  include?: UserInclude;
}

export class UserIncludeInput {
  roles?: UserRoleInclude;
}
