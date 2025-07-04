import { Component, computed, inject, input, model } from '@angular/core';
import { XJsonSchema, XJsonSchemaToTreeData, XTreeData } from '../json-schema';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XInputComponent } from '@ng-nest/ui/input';
import { AppFormService } from '@ui/core';
import { NgTemplateOutlet } from '@angular/common';
import { XButtonComponent, XButtonsComponent } from '@ng-nest/ui/button';

@Component({
  selector: 'app-schema-form',
  imports: [
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XButtonsComponent,
    NgTemplateOutlet
  ],
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
  root = computed(() => {
    const tree = this.tree();
    if (tree && tree.length === 1) return tree[0];
    return {};
  });
  formTree = computed(() => {
    const root = this.root();
    if (Object.keys(root).length === 0) {
      return [];
    } else {
      return root.children ?? [];
    }
  });

  ngOnInit() {
    // console.log(this.formGroup());
    // console.log(this.tree());
  }

  add(formArray: FormArray, nodes: XTreeData[]) {
    this.formService.formArrayAdd(formArray, nodes);
  }

  removeAt(formArray: FormArray, index: number) {
    formArray.removeAt(index);
  }

  removeAll(formArray: FormArray) {
    formArray.clear();
  }

  patchValue(data: { [key: string]: any }) {
    this.formService.formPatchValue(this.form(), data, this.formTree());
  }
}
