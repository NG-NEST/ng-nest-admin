import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XEmptyComponent, XSelectComponent, XSelectNode } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, XDialogService, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import {
  ResourceService,
  Variable,
  VariableCategory,
  VariableCategoryService,
  VariableService
} from '@ui/api';
import { Subject, concatMap, finalize, tap } from 'rxjs';
import { VariableCategoryComponent } from '../variable-category/variable-category.component';

@Component({
  selector: 'app-variable-setting',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XEmptyComponent,
    XDialogModule
  ],
  templateUrl: './variable-setting.component.html',
  styleUrls: ['./variable-setting.component.scss']
})
export class VariableSettingComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<VariableSettingComponent>);
  dialog = inject(XDialogService);
  data = inject<{ resourceId: string }>(X_DIALOG_DATA);
  variableCategoryService = inject(VariableCategoryService);
  variableService = inject(VariableService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  resource = inject(ResourceService);

  resourceId = signal('');
  formLoading = signal(false);
  saveLoading = signal(false);
  tableLoading = signal(false);

  form!: FormGroup;

  variableCategorys = signal<XSelectNode[]>([]);
  typeList = signal<XSelectNode[]>([]);

  get many() {
    return this.form.controls['many'] as FormArray;
  }

  get variableCategoryIsEmpty() {
    return !this.form.getRawValue()['variableCategoryId'];
  }

  $destroy = new Subject<void>();
  constructor() {
    const { resourceId } = this.data;
    this.resourceId.set(resourceId);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      variableCategoryId: ['', [Validators.required]],
      resourceId: [this.resourceId(), [Validators.required]],
      many: this.fb.array([])
    });

    this.getVariableCategory()
      .pipe(concatMap(() => this.getTypeList()))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  getVariableCategory() {
    return this.variableCategoryService
      .variableCategorySelect({
        where: { resourceId: { equals: this.resourceId() } }
      })
      .pipe(
        tap((x) => {
          this.variableCategorys.set(
            x.map((y: any) => {
              y.label = y.name;
              return y;
            })
          );
          if (!this.form.getRawValue().variableCategoryId && this.variableCategorys().length > 0) {
            this.form.patchValue({ variableCategoryId: this.variableCategorys()[0].id });
            this.variableCategoryChange(this.variableCategorys()[0].id);
          }
        })
      );
  }

  getTypeList() {
    return this.resource
      .resourceSelect({
        where: { subject: { code: { equals: 'variable-type' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.typeList.set(
            x.map((y: any) => {
              y.label = y.name;
              return y;
            })
          );
        })
      );
  }

  save() {
    const value = this.form.getRawValue();
    let msg = '';
    this.saveLoading.set(true);
    this.variableService
      .saveMany(value)
      .pipe(
        tap(() => {
          this.message.success(msg);
        }),
        finalize(() => {
          this.saveLoading.set(false);
        })
      )
      .subscribe();
  }

  variableCategoryChange(value: string) {
    if (!value) return;

    this.many.clear();
    this.tableLoading.set(true);
    this.variableService
      .variableSelect({
        where: { variableCategoryId: { equals: value } }
      })
      .pipe(
        tap((x) => {
          for (let item of x) {
            this.add(item);
          }
        }),
        finalize(() => {
          this.tableLoading.set(false);
        })
      )
      .subscribe();
  }

  createCategory() {
    this.dialog.create(VariableCategoryComponent, {
      width: '30rem',
      data: {
        resourceId: this.resourceId(),
        saveSuccess: (variableCategory: VariableCategory) => {
          this.getVariableCategory().subscribe(() => {
            this.form.patchValue({ variableCategoryId: variableCategory.id });
          });
        }
      }
    });
  }

  add(variable?: Variable) {
    this.many.push(
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
    this.many.removeAt(i);
  }
}
