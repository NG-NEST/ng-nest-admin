import { Component, inject, OnDestroy, TemplateRef, viewChild } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AppEditorComponent, AppJsonSchemaComponent } from '../..';
import { XDialogModule, XDialogRef, XDialogService } from '@ng-nest/ui/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { XTreeDataToJsonSchemaWorker } from '../worker/worker';

@Component({
  selector: 'app-operation',
  imports: [ReactiveFormsModule, XButtonComponent, XDialogModule, AppEditorComponent],
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class AppOperationComponent implements OnDestroy {
  loadingGet = false;
  loadingSet = false;
  jsonContent: any = {};
  jsonSchemaString: string = '';

  $destroy = new Subject<void>();
  jsonSchemaTpl = viewChild.required<TemplateRef<void>>('jsonSchemaTpl');

  schema = inject(AppJsonSchemaComponent, { optional: true, host: true });
  dialog = inject(XDialogService);
  formBuild = inject(FormBuilder);

  form = this.formBuild.group({
    jsonContent: ['', [Validators.required]]
  });

  saveLoading = false;

  dialogRef: XDialogRef<TemplateRef<any>> | null = null;

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  onJsonSchema() {
    this.loadingGet = true;
    XTreeDataToJsonSchemaWorker(this.schema?.treeData()!)
      .pipe(
        finalize(() => (this.loadingGet = false)),
        takeUntil(this.$destroy)
      )
      .subscribe((x) => {
        this.form.patchValue({ jsonContent: JSON.stringify(x, null, 2) });
        this.dialogRef = this.dialog.create(this.jsonSchemaTpl(), {
          width: '100%',
          height: '100%'
        });
      });
  }

  save() {
    this.loadingSet = true;
    const { jsonContent } = this.form.getRawValue();
    try {
      this.schema?.data.set(JSON.parse(jsonContent!));
      this.schema?.setTreeData();
      this.dialogRef?.close();
    } catch (e) {}
  }
}
