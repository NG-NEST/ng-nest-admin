import { BaseSelect } from '@api/core';

export interface UserSelect extends BaseSelect {
  name?: true;
  account?: true;
  email?: true;
  phone?: true;
}

export interface GetUserSelect {
  select?: UserSelect;
}
