import { ArgsType } from '@nestjs/graphql';
import { ResourceWhereInput } from '../resource/where';
import { ResourceOrderInput } from '../resource/order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class SubjectResourceInput extends BaseSelectInput(ResourceWhereInput, ResourceOrderInput) {}
