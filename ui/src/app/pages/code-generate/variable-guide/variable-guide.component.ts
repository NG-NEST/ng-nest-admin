import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { X_DIALOG_DATA, XDialogModule, XDialogRef } from '@ng-nest/ui/dialog';
import { XStepsComponent } from '@ng-nest/ui/steps';
import { XTabsModule } from '@ng-nest/ui/tabs';
import {
  CatalogueService,
  Schema,
  SchemaData,
  SchemaDataService,
  SchemaService,
  Variable
} from '@ui/api';
import { AppFormService, AppSchemaFormComponent, XJsonSchema } from '@ui/core';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-variable-guide',
  imports: [
    ReactiveFormsModule,
    XButtonComponent,
    XDialogModule,
    XStepsComponent,
    XTabsModule,
    AppSchemaFormComponent
  ],
  templateUrl: './variable-guide.component.html',
  styleUrl: './variable-guide.component.scss'
})
export class VariableGuideComponent {
  dialogRef = inject(XDialogRef<VariableGuideComponent>);
  data = inject<{
    variables: Variable[];
    title: string;
    saveSuccess: (schemaDatas: SchemaData[]) => void;
  }>(X_DIALOG_DATA);
  formBuilder = inject(FormBuilder);
  formService = inject(AppFormService);
  schema = inject(SchemaService);
  schemaData = inject(SchemaDataService);
  catalogue = inject(CatalogueService);

  saveLoading = signal<boolean>(false);

  variables = signal<Variable[]>([]);
  title = signal<string>('');
  schemaVariables = computed(() => {
    return this.variables().filter((item) => item.type === 'json-schema' && item.value);
  });

  form = computed(() => {
    const form = this.formBuilder.group({});
    const formList = this.formList();
    for (let item of formList) {
      const subform = this.formBuilder.group({});
      this.formService.addControlByJsonSchema(subform, item.jsonSchema);
      form.addControl(item.variableId, subform);
    }
    return form;
  });

  formList = computed(() => {
    const schemaList = this.schemaList();
    const formList: (Schema & { variableId: string; jsonSchema: XJsonSchema })[] = [];
    for (let schema of schemaList) {
      try {
        formList.push({ ...schema, jsonSchema: schema.json as XJsonSchema });
      } catch (error) {
        console.error(error);
      }
    }

    return formList;
  });

  get nextDisabled() {
    const currentForm = this.formList()[this.stepIndex()];
    return !!this.form().get(currentForm.variableId)?.invalid;
  }

  schemaList = signal<(Schema & { variableId: string })[]>([]);
  stepIndex = signal(0);
  steps = computed(() => {
    const schemaList = this.schemaList();
    return schemaList.map((x) => ({
      label: x.name,
      description: x.description
    }));
  });

  constructor() {
    const { variables, title } = this.data;
    this.variables.set(variables);
    this.title.set(title);
  }

  ngOnInit(): void {
    forkJoin(this.schemaVariables().map((x) => this.schema.schema(x.value!))).subscribe((x) => {
      this.schemaList.update(() => {
        const schemaListWithVariableId = x.map((item, index) => ({
          ...item,
          variableId: this.schemaVariables()[index].id
        }));
        return schemaListWithVariableId;
      });
    });
  }

  getForm(id: string) {
    return this.form().get(id) as FormGroup;
  }

  pre() {
    this.stepIndex.update((x) => --x);
  }

  next() {
    this.stepIndex.update((x) => ++x);
  }

  save() {
    const val: { [variableId: string]: any } = this.form().getRawValue();
    this.saveLoading.set(true);
    forkJoin(
      this.formList().map((x) =>
        this.schemaData.create({
          schemaId: x.id,
          formId: x.variableId,
          data: JSON.stringify(val[x.variableId])
        })
      )
    )
      .pipe(finalize(() => this.saveLoading.set(false)))
      .subscribe((x) => {
        this.data.saveSuccess(x);
      });

    // for (let variable of this.variables()) {
    //   const { code, value, type, variableCategory } = variable;
    //   if (type === 'json-schema' && value) {
    //     set(vars, `${variableCategory.code}.${code}`, val[value]);
    //   } else {
    //     set(vars, `${variableCategory.code}.${code}`, value);
    //   }
    // }
  }
}
