import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  signal,
  viewChildren
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { X_DIALOG_DATA, XDialogModule, XDialogRef, XDialogService } from '@ng-nest/ui/dialog';
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
import { AppFormService, AppSchemaFormComponent, XJsonSchema, XTreeData } from '@ui/core';
import { finalize, forkJoin } from 'rxjs';
import { SelectSchemaDataComponent } from '../select-schema-data/select-schema-data.component';

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
    many: boolean;
    saveSuccess: (schemaDatas: SchemaData[]) => void;
  }>(X_DIALOG_DATA);
  formBuilder = inject(FormBuilder);
  formService = inject(AppFormService);
  schema = inject(SchemaService);
  schemaData = inject(SchemaDataService);
  catalogue = inject(CatalogueService);
  dialog = inject(XDialogService);
  cdr = inject(ChangeDetectorRef);

  saveLoading = signal<boolean>(false);

  variables = signal<Variable[]>([]);
  title = signal<string>('');
  many = signal<boolean>(true);

  schemaForms = viewChildren(AppSchemaFormComponent);

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
    const { variables, title, many } = this.data;
    this.variables.set(variables);
    this.title.set(title);
    this.many.set(many);
  }

  ngOnInit(): void {
    forkJoin(this.schemaVariables().map((x) => this.schema.schema(x.value! as string))).subscribe(
      (x) => {
        this.schemaList.update(() => {
          let schemaListWithVariableId = x.map((item, index) => ({
            ...item,
            variableId: this.schemaVariables()[index].id
          }));
          if (!this.many()) {
            schemaListWithVariableId = schemaListWithVariableId.filter((x) => {
              const { type } = x.json as XJsonSchema;
              return type !== 'array';
            });
          }
          return schemaListWithVariableId;
        });
      }
    );
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

  onSelectData(form: Schema & { variableId: string; jsonSchema: XJsonSchema }) {
    this.dialog.create(SelectSchemaDataComponent, {
      width: '100%',
      height: '100%',
      data: {
        title: '选择数据',
        schemaId: form.id,
        saveSuccess: (data: { [key: string]: any }) => {
          const { $root } = data;
          if ($root) {
            const schemaForm = this.schemaForms()[this.stepIndex()];
            const tree = schemaForm.tree();
            this.formService.formArrayAdd(
              (this.form().controls as any)[form.variableId].controls['$root'] as FormArray,
              (tree[0].children ? tree[0].children[0].children : []) as XTreeData[],
              $root
            );
            this.cdr.detectChanges();
          } else {
            this.form().patchValue({ [form.variableId]: data });
          }
        }
      }
    });
  }

  save() {
    const val: { [variableId: string]: any } = this.form().getRawValue();
    this.saveLoading.set(true);
    forkJoin(
      this.formList().map((x) =>
        this.schemaData.create({
          schemaId: x.id,
          formId: x.variableId,
          data: val[x.variableId]
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
