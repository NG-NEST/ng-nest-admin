import { BaseSelectInput } from '@ui/core';
import { ResourceWhereInput } from './where';
import { ResourceOrderInput } from './order';

export class ResourceSelectInput extends BaseSelectInput(ResourceWhereInput, ResourceOrderInput) {}
