import { Component, OnDestroy, OnInit, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XIconComponent, XTextareaComponent, XTooltipDirective } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { SchemaService } from '@ui/api';
import { AppJsonSchemaComponent, XJsonSchema } from '@ui/core';
import { isEqual } from 'lodash-es';
import { Observable, Subject, concatMap, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-schema-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XTextareaComponent,
    XIconComponent,
    XTooltipDirective,
    AppJsonSchemaComponent
  ],
  templateUrl: './schema-detail.component.html',
  styleUrls: ['./schema-detail.component.scss']
})
export class SchemaDetailComponent implements OnInit, OnDestroy {
  data = inject<{ id: string; saveSuccess: () => void }>(X_DIALOG_DATA);
  schema = inject(SchemaService);
  message = inject(XMessageService);

  dialogRef = inject(XDialogRef<SchemaDetailComponent>);
  formBuild = inject(FormBuilder);
  jsonSchemaCom = viewChild.required<AppJsonSchemaComponent>('jsonSchemaCom');

  id = signal('');

  jsonSchema: XJsonSchema = {
    title: '',
    description: '',
    type: 'object',
    properties: {}
  };

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.form = this.formBuild.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      version: [{ disabled: true, value: null }, []],
      description: [null],
      json: [null]
    });
    const { id } = this.data;
    this.id.set(id);
    if (this.id()) {
      this.formLoading.set(true);
      this.schema
        .schema(this.id())
        .pipe(
          tap((x) => {
            this.form.patchValue(x);
            this.jsonSchema = x.json as XJsonSchema;
          }),
          finalize(() => this.formLoading.set(false))
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;

    if (!this.id()) {
      rq = this.jsonSchemaCom()
        .getJsonSchema()
        .pipe(
          concatMap((json) => {
            return this.schema.create({ ...this.form.value, json });
          })
        );
    } else {
      rq = this.jsonSchemaCom()
        .getJsonSchema()
        .pipe(
          concatMap((json) => {
            if (!isEqual(json, this.form.value.json)) {
              return this.schema.create({ ...this.form.value, json });
            } else {
              return this.schema.update({
                id: this.id(),
                ...this.form.value,
                json
              });
            }
          })
        );
    }
    this.saveLoading.set(true);
    rq.pipe(
      tap((x) => {
        this.message.success(x);
        this.dialogRef.close();
        this.data.saveSuccess();
      }),
      finalize(() => {
        this.saveLoading.set(false);
      })
    ).subscribe();
  }
}
