import { Component, computed, inject, input, model } from '@angular/core';
import { XJsonSchema, XJsonSchemaToTreeData } from '../json-schema';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';
import { AppFormService } from '@ui/core';

@Component({
  selector: 'app-schema-form',
  imports: [ReactiveFormsModule, XInputComponent],
  templateUrl: './schema-form.component.html',
  styleUrls: ['./schema-form.component.scss']
})
export class AppSchemaFormComponent {
  formBuilder = inject(FormBuilder);
  formService = inject(AppFormService);
  data = model<XJsonSchema>({});
  form = input.required<FormGroup>();
  formGroup = computed(() => {
    this.formService.addControlByJsonSchema(this.form(), this.data());
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
}
