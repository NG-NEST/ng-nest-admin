import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import type { XJsonSchema, XTreeData } from '../components/json-schema';

@Injectable({ providedIn: 'root' })
export class AppFormService {
  formBuilder = inject(FormBuilder);

  addControlByJsonSchema(form: FormGroup, schema: XJsonSchema, formName = '$root') {
    if (!schema) return;
    const { required, type, items } = schema;
    const properties = schema.properties || {};
    if (type === 'array' && items) {
      form.addControl(formName, this.formBuilder.array([]));
    } else {
      for (let key in properties) {
        const propertySchema = properties[key];
        const validators = [];
        if (required?.includes(key)) {
          validators.push(Validators.required);
        }
        if (propertySchema.type === 'object' && propertySchema.properties) {
          const subform = this.formBuilder.group({});
          this.addControlByJsonSchema(subform, propertySchema as XJsonSchema, key);
          form.addControl(key, subform);
        } else if (propertySchema.type === 'array' && propertySchema.items) {
          form.addControl(key, this.formBuilder.array([], validators));
        } else {
          form.addControl(key, this.formBuilder.control(null, validators));
        }
      }
    }
  }

  formArrayAdd(formArray: FormArray, nodes: XTreeData[], data: any[] = [{}]) {
    for (let item of data) {
      const keys: { [key: string]: any } = {};
      for (let node of nodes) {
        const { name, required, type } = node;
        const validators = [];
        const val = item[name!];
        if (required) validators.push(Validators.required);
        if (type === 'array') {
          keys[name!] = this.formBuilder.array([]);
        } else {
          keys[name!] = [val ?? null, validators];
        }
      }
      const formGroup = this.formBuilder.group(keys);
      formArray.push(formGroup);
    }
  }

  formPatchValue(form: FormGroup, data: { [key: string]: any }, tree: XTreeData[]) {
    for (let node of tree) {
      const { name, isArray, isObject } = node;
      const val = data[name!];
      if (isArray) {
        const subForm = form.get(name!) as FormArray;
        if (!subForm) continue;
        this.formArrayAdd(subForm, node.children!, val);
      } else if (isObject) {
        const subForm = form.get(name!) as FormGroup;
        subForm.patchValue(val);
      } else {
        const control = form.get(name!) as FormControl;
        control.patchValue(val);
      }
    }
  }
}
