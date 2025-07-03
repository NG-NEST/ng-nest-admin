import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { SchemaData, SchemaDataMessage, SchemaDataService, SchemaService } from '@ui/api';
import { AppSchemaFormComponent, JsonValue, XJsonSchema } from '@ui/core';
import { Observable, Subject, concatMap, finalize, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-schema-data-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XButtonComponent,
    XDialogModule,
    AppSchemaFormComponent
  ],
  templateUrl: './schema-data-detail.component.html',
  styleUrls: ['./schema-data-detail.component.scss']
})
export class SchemaDataDetailComponent implements OnInit, OnDestroy {
  data = inject<{ schemaId: string; id: string; saveSuccess: () => void }>(X_DIALOG_DATA);
  schemaData = inject(SchemaDataService);
  schema = inject(SchemaService);
  message = inject(XMessageService);

  dialogRef = inject(XDialogRef<SchemaDataDetailComponent>);
  formBuild = inject(FormBuilder);

  id = signal<string | null>(null);
  schemaId = signal<string | null>(null);
  schemaJson = signal<XJsonSchema | null>(null);

  json: JsonValue = {};

  formLoading = signal(false);
  saveLoading = signal(false);

  form: FormGroup = this.formBuild.group({});

  $destroy = new Subject<void>();

  constructor() {
    const { id, schemaId } = this.data;
    this.id.set(id);
    this.schemaId.set(schemaId);
  }

  ngOnInit(): void {
    const req: Observable<any> = this.getSchema().pipe(
      concatMap(() => {
        if (this.id()) return this.getSchemaData();
        return of();
      })
    );

    this.formLoading.set(true);
    req.pipe(finalize(() => this.formLoading.set(false))).subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  getSchema() {
    return this.schema.schema(this.schemaId()!).pipe(
      map((x) => {
        this.schemaJson.set(JSON.parse(x.json));
        console.log(this.schemaJson());
      })
    );
  }

  getSchemaData() {
    return this.schemaData.schemaData(this.id()!).pipe(
      tap((x) => {
        const { data } = x;
        this.form.patchValue(JSON.parse(data as string));
      })
    );
  }

  save() {
    let rq!: Observable<SchemaData>;
    const data = JSON.stringify(this.form.getRawValue());
    const val = {
      schemaId: this.schemaId()!,
      data
    };
    let msg = '';

    if (!this.id()) {
      msg = SchemaDataMessage.CreatedSuccess;
      rq = this.schemaData.create({ ...val });
    } else {
      msg = SchemaDataMessage.UpdatedSuccess;
      rq = this.schemaData.update({
        id: this.id()!,
        ...val
      });
    }
    this.saveLoading.set(true);
    rq.pipe(
      tap(() => {
        this.message.success(msg);
        this.dialogRef.close();
        this.data.saveSuccess();
      }),
      finalize(() => {
        this.saveLoading.set(false);
      })
    ).subscribe();
  }
}
