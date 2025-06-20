/// <reference lib="webworker" />

import { XTreeDataToJsonSchema } from '../json-schema.function';

addEventListener('message', ({ data }) => {
  postMessage(XTreeDataToJsonSchema(data));
});
