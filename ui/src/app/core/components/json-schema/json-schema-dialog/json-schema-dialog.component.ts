import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { X_DIALOG_DATA, XButtonComponent, XDialogModule, XDialogRef } from '@ng-nest/ui';
import { AppEditorComponent, XJsonSchema } from '@ui/core';

@Component({
  selector: 'app-json-schema-dialog',
  imports: [ReactiveFormsModule, XButtonComponent, XDialogModule, AppEditorComponent],
  templateUrl: './json-schema-dialog.component.html',
  styleUrls: ['./json-schema-dialog.component.scss']
})
export class AppJsonSchemaDialogComponent {
  dialogRef = inject(XDialogRef);
  formBuild = inject(FormBuilder);

  data = inject<{
    disabled: boolean;
    jsonSchema: XJsonSchema;
    saveSuccess: (jsonSchema: XJsonSchema) => void;
  }>(X_DIALOG_DATA);

  disabled = signal(false);
  saveLoading = signal(false);

  form = this.formBuild.group({
    jsonContent: ['', [Validators.required]]
  });

  constructor() {
    this.disabled.set(this.data.disabled);
    this.form.patchValue({ jsonContent: JSON.stringify(this.data.jsonSchema, null, 2) });
  }

  save() {
    const { jsonContent } = this.form.getRawValue();
    this.data.saveSuccess(JSON.parse(jsonContent!) as XJsonSchema);
    this.dialogRef.close();
  }
}
