import { Component, computed, model } from '@angular/core';
import { XJsonSchema } from '../json-schema';
import { XJsonSchemaToFormGroup } from './schema-form.function';

@Component({
  selector: 'app-schema-form',
  imports: [],
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})
export class AppSchemaFormComponent {
  data = model<XJsonSchema>({});

  formGroup = computed(() => XJsonSchemaToFormGroup(this.data()));
}
