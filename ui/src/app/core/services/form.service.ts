import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import type { XJsonSchema } from '../components/json-schema';

@Injectable({ providedIn: 'root' })
export class AppFormService {
  formBuilder = inject(FormBuilder);

  addControlByJsonSchema(form: FormGroup, schema: XJsonSchema) {
    if (!schema) return;
    const { required, type, items } = schema;
    const properties = schema.properties || {};
    if (type === 'array' && items) {
      form.addControl('[items]', this.formBuilder.array([]));
    } else {
      for (let key in properties) {
        const propertySchema = properties[key];
        const validators = [];
        if (required?.includes(key)) {
          validators.push(Validators.required);
        }
        if (propertySchema.type === 'object' && propertySchema.properties) {
          const subform = this.formBuilder.group({});
          this.addControlByJsonSchema(subform, propertySchema as XJsonSchema);
          form.addControl(key, subform);
        } else if (propertySchema.type === 'array' && propertySchema.items) {
          form.addControl(key, this.formBuilder.array([], validators));
        } else {
          form.addControl(key, this.formBuilder.control(null, validators));
        }
      }
    }
  }
}
