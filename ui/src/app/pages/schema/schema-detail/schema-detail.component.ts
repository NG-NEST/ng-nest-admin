import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { SchemaService } from '@ui/api';
import { AppJsonSchemaComponent } from '@ui/core';
import { Observable, Subject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-schema-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    AppJsonSchemaComponent
  ],
  templateUrl: './schema-detail.component.html'
})
export class SchemaDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<SchemaDetailComponent>);
  id = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA) public data: { id: string; saveSuccess: () => void },
    private schema: SchemaService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      json: [null, [Validators.required]]
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
      rq = this.schema.create(this.form.value);
    } else {
      rq = this.schema.update({ id: this.id(), ...this.form.value });
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
