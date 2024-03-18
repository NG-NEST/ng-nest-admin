import { ArgsType } from '@nestjs/graphql';
import { SubjectWhereInput } from './where';
import { SubjectOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class SubjectSelectInput extends BaseSelectInput(SubjectWhereInput, SubjectOrderInput) {}
