import { Component, inject, input, OnDestroy, TemplateRef } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { AppJsonSchemaComponent, XJsonSchema } from '../..';
import { XDialogModule, XDialogRef, XDialogService } from '@ng-nest/ui/dialog';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XTreeDataToJsonSchemaWorker } from '../worker/worker';
import { XLinkComponent } from '@ng-nest/ui';
import { AppJsonSchemaDialogComponent } from '../json-schema-dialog/json-schema-dialog.component';

@Component({
  selector: 'app-operation',
  imports: [ReactiveFormsModule, XLinkComponent, XDialogModule],
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class AppOperationComponent implements OnDestroy {
  title = input<string>('');
  disabled = input<boolean>(false);
  loadingGet = false;
  loadingSet = false;
  jsonContent: any = {};
  jsonSchemaString: string = '';

  $destroy = new Subject<void>();

  schema = inject(AppJsonSchemaComponent, { optional: true, host: true });
  dialog = inject(XDialogService);
  formBuild = inject(FormBuilder);

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
        this.dialog.create(AppJsonSchemaDialogComponent, {
          width: '100%',
          height: '100%',
          data: {
            disabled: this.disabled(),
            jsonSchema: x,
            saveSuccess: (jsonSchema: XJsonSchema) => {
              this.schema?.writeValue(jsonSchema);
              this.schema?.setTreeData();
            }
          }
        });
      });
  }
}
