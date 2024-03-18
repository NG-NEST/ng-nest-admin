import { BaseSelectInput } from '@ui/core';
import { SubjectWhereInput } from './where';
import { SubjectOrderInput } from './order';

export class SubjectSelectInput extends BaseSelectInput(SubjectWhereInput, SubjectOrderInput) {}
