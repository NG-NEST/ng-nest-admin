import { Permission } from './permission.model';

export class PermessionSaveManyInput {
  many!: Permission[];
  resourceId!: string;
}
