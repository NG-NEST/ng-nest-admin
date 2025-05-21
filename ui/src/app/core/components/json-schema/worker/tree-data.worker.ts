/// <reference lib="webworker" />

import { XJsonSchemaToTreeData } from "../json-schema.function";

addEventListener('message', ({ data }) => {
  postMessage(XJsonSchemaToTreeData(data));
});
