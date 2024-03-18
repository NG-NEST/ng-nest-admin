import { ArgsType } from '@nestjs/graphql';
import { ResourceWhereInput } from './where';
import { ResourceOrderInput } from './order';
import { BaseSelectInput } from '@api/core';

@ArgsType()
export class ResourceSelectInput extends BaseSelectInput(ResourceWhereInput, ResourceOrderInput) {}
