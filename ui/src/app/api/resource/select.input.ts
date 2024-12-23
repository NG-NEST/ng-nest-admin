import { BaseSelectInput } from '@ui/core';
import { ResourceWhereInput } from './where';
import { ResourceOrderInput } from './order';
import { ResourceIncludeInput } from './include';

export class ResourceSelectInput extends BaseSelectInput(
  ResourceWhereInput,
  ResourceOrderInput,
  ResourceIncludeInput
) {}
