import { BaseWhereInput, DateTimeFilter, StringFilter } from '@ui/core';

export class UserWhereInput extends BaseWhereInput<UserWhereInput> {
  name?: StringFilter;
  account?: StringFilter;
  email?: StringFilter;
  phone?: StringFilter;
  createdAt?: DateTimeFilter;
  updatedAt?: DateTimeFilter;
}
