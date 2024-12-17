import { BaseSelectInput } from '@ui/core';
import { ResourceWhereInput } from '../resource/where';
import { ResourceOrderInput } from '../resource/order';

export class SubjectResourceInput extends BaseSelectInput(ResourceWhereInput, ResourceOrderInput) {}
