import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { Catalogue, Variable, VariableCategoryService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-variable-setting',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule
  ],
  templateUrl: './variable-setting.component.html',
  styleUrls: ['./variable-setting.component.scss']
})
export class VariableSettingComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<VariableSettingComponent>);
  data = inject<{ resourceId: string }>(X_DIALOG_DATA);
  variableCategoryService = inject(VariableCategoryService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);

  resourceId = signal('');
  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  variableCategorys = signal<XSelectNode[]>([]);

  $destroy = new Subject<void>();
  constructor() {
    const { resourceId } = this.data;
    this.resourceId.set(resourceId);
  }

  get global() {
    return this.form.controls['global'] as FormArray;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      variableCategoryId: ['', [Validators.required]],
      resourceId: [this.resourceId(), [Validators.required]],
      global: this.fb.array([])
    });

    forkJoin([
      this.variableCategoryService
        .variableCategorySelect({
          where: { resourceId: { equals: this.resourceId() } }
        })
        .pipe(
          tap((x) => {
            console.log(x);
            this.variableCategorys.set(
              x.map((y: any) => {
                y.label = y.name;
                return y;
              })
            );
          })
        )
    ]).subscribe();

    if (this.resourceId()) {
      // this.formLoading.set(true);
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<Catalogue>;
    const value = this.form.getRawValue();
    value;
    let msg = '';
    // if (!this.resou()) {
    //   msg = CatalogueMessage.CreatedSuccess;
    //   rq = this.catalogue.create(value);
    // } else {
    //   msg = CatalogueMessage.UpdatedSuccess;
    //   rq = this.catalogue.update({ id: this.id(), ...value });
    // }
    this.saveLoading.set(true);
    rq.pipe(
      tap(() => {
        this.message.success(msg);
        this.dialogRef.close();
        // this.data.saveSuccess(x);
      }),
      finalize(() => {
        this.saveLoading.set(false);
      })
    ).subscribe();
  }

  variableCategoryChange(value: string) {
    console.log(value);
  }

  add(variable?: Variable) {
    this.global.push(
      this.fb.group({
        id: [variable?.id ?? ''],
        code: [variable?.code ?? '', [Validators.required]],
        type: [variable?.type ?? ''],
        value: [variable?.value ?? ''],
        description: [variable?.description ?? ''],
        resourceId: [variable?.resourceId ?? this.resourceId()],
        variableCategoryId: [
          variable?.variableCategoryId ?? this.form.getRawValue()['variableCategoryId']
        ]
      })
    );
  }

  remove(i: number) {
    this.global.removeAt(i);
  }
}
