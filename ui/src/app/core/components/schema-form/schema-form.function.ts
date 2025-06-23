import { FormGroup, Validators } from '@angular/forms';
import { XJsonSchema } from '../json-schema';

export function XJsonSchemaToFormGroup(schema: XJsonSchema): FormGroup {
  if (!schema) return new FormGroup({});
  const controls: { [key: string]: any } = {};

  const { required } = schema;
  for (let key in schema.properties) {
    const validators = [];
    if (required?.includes(key)) {
      validators.push(Validators.required);
    }
    controls[key] = [null, validators];
  }
  const form = new FormGroup(controls);

  return form;
}
