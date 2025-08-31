import { ArgsType } from '@nestjs/graphql';
import { ModelWhereInput } from './where';
import { ModelOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class ModelSelectInput extends BaseSelectInput(ModelWhereInput, ModelOrderInput) {}
