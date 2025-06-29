import { Component, computed, inject, input, model } from '@angular/core';
import { XJsonSchema, XJsonSchemaToTreeData } from '../json-schema';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';

@Component({
  selector: 'app-schema-form',
  imports: [ReactiveFormsModule, XInputComponent],
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})
export class AppSchemaFormComponent {
  formBuilder = inject(FormBuilder);
  data = model<XJsonSchema>({});
  form = input.required<FormGroup>();
  formGroup = computed(() => {
    this.addControl(this.form(), this.data());
    return this.form();
  });

  tree = computed(() => XJsonSchemaToTreeData(this.data()));
  title = computed(() => {
    const tree = this.tree();
    if (tree && tree.length === 1) return tree[0];
    return {};
  });
  formTree = computed(() => {
    const title = this.title();
    if (Object.keys(title).length === 0) {
      return [];
    } else {
      return title.children ?? [];
    }
  });

  addControl(form: FormGroup, schema: XJsonSchema) {
    if (!schema) return;
    const { required } = schema;
    const properties = schema.properties || {};
    for (let key in properties) {
      const propertySchema = properties[key];
      const validators = [];
      if (required?.includes(key)) {
        validators.push(Validators.required);
      }
      if (propertySchema.type === 'object' && propertySchema.properties) {
        const subform = this.formBuilder.group({});
        this.addControl(subform, propertySchema as XJsonSchema);
        form.addControl(key, subform);
      } else if (propertySchema.type === 'array' && propertySchema.items) {
        form.addControl(key, this.formBuilder.array([], validators));
      } else {
        form.addControl(key, this.formBuilder.control(null, validators));
      }
    }
  }

  jsonSchemaToFormGroup(schema: XJsonSchema) {
    if (!schema) return {};
    const controls: { [key: string]: any } = {};

    const { required } = schema;
    const properties = schema.properties || {};
    for (let key in properties) {
      const propertySchema = properties[key];
      const validators = [];
      if (required?.includes(key)) {
        validators.push(Validators.required);
      }
      if (propertySchema.type === 'object' && propertySchema.properties) {
        controls[key] = this.formBuilder.group(
          this.jsonSchemaToFormGroup(propertySchema as XJsonSchema)
        );
      } else if (propertySchema.type === 'array' && propertySchema.items) {
        const itemSchema = propertySchema.items as XJsonSchema;
        controls[key] = this.formBuilder.array(
          [this.formBuilder.group(this.jsonSchemaToFormGroup(itemSchema))],
          validators
        );
      } else {
        controls[key] = [null, validators];
      }
    }

    return controls;
  }
}
