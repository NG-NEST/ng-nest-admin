import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { X_DIALOG_DATA, XDialogModule, XDialogRef } from '@ng-nest/ui/dialog';
import { XStepsComponent } from '@ng-nest/ui/steps';
import { CatalogueService, Schema, SchemaService, Variable } from '@ui/api';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-variable-guide',
  imports: [ReactiveFormsModule, XButtonComponent, XDialogModule, XStepsComponent],
  templateUrl: './variable-guide.component.html',
  styleUrl: './variable-guide.component.scss'
})
export class VariableGuideComponent {
  dialogRef = inject(XDialogRef<VariableGuideComponent>);
  data = inject<{ variables: Variable[]; title: string }>(X_DIALOG_DATA);
  formBuilder = inject(FormBuilder);
  schema = inject(SchemaService);
  catalogue = inject(CatalogueService);

  variables = signal<Variable[]>([]);
  title = signal<string>('');
  schemaVariables = computed(() => {
    return this.variables().filter((item) => item.type === 'json-schema' && item.value);
  });

  form: FormGroup = this.formBuilder.group({});

  schemaList = signal<Schema[]>([]);
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
      this.schemaList.set(x);
    });
  }
}
