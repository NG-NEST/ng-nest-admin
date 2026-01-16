import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { X_DIALOG_DATA, XButtonComponent, XDialogModule, XDialogRef, XI18nPipe } from '@ng-nest/ui';
import { AppEditorComponent } from '@ui/core';

@Component({
  selector: 'app-json-dialog',
  imports: [ReactiveFormsModule, XButtonComponent, XI18nPipe, XDialogModule, AppEditorComponent],
  templateUrl: './json-dialog.component.html',
  styleUrls: ['./json-dialog.component.scss']
})
export class AppJsonDialogComponent {
  dialogRef = inject(XDialogRef);
  formBuild = inject(FormBuilder);

  data = inject<{
    title: string;
    disabled: boolean;
    content: { [key: string]: any };
    saveSuccess: (content: { [key: string]: any }) => void;
  }>(X_DIALOG_DATA);

  title = signal('');
  disabled = signal(false);
  saveLoading = signal(false);

  form = this.formBuild.group({
    json: ['', [Validators.required]]
  });

  constructor() {
    this.title.set(this.data.title);
    this.disabled.set(this.data.disabled);
    this.form.patchValue({ json: JSON.stringify(this.data.content, null, 2) });
  }

  save() {
    const { json } = this.form.getRawValue();
    this.data.saveSuccess(JSON.parse(json!) as { [key: string]: any });
    this.dialogRef.close();
  }
}
