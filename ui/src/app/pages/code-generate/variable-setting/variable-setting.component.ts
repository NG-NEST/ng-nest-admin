import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  XCascadeComponent,
  XCascadeNode,
  XEmptyComponent,
  XIconComponent,
  XLinkComponent,
  XMessageBoxAction,
  XMessageBoxService,
  XRadioModule,
  XSelectComponent,
  XSelectNode,
  XTooltipDirective
} from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, XDialogService, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import {
  ResourceService,
  Schema,
  SchemaService,
  Variable,
  VariableCategory,
  VariableCategoryService,
  VariableService
} from '@ui/api';
import { Subject, concatMap, finalize, takeUntil, tap } from 'rxjs';
import { VariableCategoryComponent } from '../variable-category/variable-category.component';
import { first, groupBy } from 'lodash-es';
import { AppSortVersions } from '@ui/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-variable-setting',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XEmptyComponent,
    XLinkComponent,
    XTooltipDirective,
    XCascadeComponent,
    XIconComponent,
    XDialogModule,
    XRadioModule,
    DragDropModule
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
  schema = inject(SchemaService);
  messageBox = inject(XMessageBoxService);
  cdr = inject(ChangeDetectorRef);

  resourceId = signal('');
  formLoading = signal(false);
  saveLoading = signal(false);
  tableLoading = signal(false);
  variableCategoryDragging = signal(false);

  form!: FormGroup;

  variableCategorys = signal<VariableCategory[]>([]);
  typeList = signal<XSelectNode[]>([]);
  schemaList = signal<XCascadeNode[]>([]);

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

    this.form.controls['variableCategoryId'].valueChanges
      .pipe(takeUntil(this.$destroy))
      .subscribe((x) => {
        this.variableCategoryChange(x);
      });

    this.formLoading.set(true);
    this.getVariableCategory()
      .pipe(
        concatMap(() => this.getTypeList()),
        concatMap(() => this.getSchemaList()),
        finalize(() => this.formLoading.set(false))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  action($event: Event, type: string, item: any) {
    $event.stopPropagation();
    switch (type) {
      case 'edit':
        this.dialog.create(VariableCategoryComponent, {
          width: '30rem',
          data: {
            resourceId: this.resourceId(),
            id: item.id,
            saveSuccess: (variableCategory: VariableCategory) => {
              this.getVariableCategory().subscribe(() => {
                this.form.patchValue({ variableCategoryId: variableCategory.id });
              });
            }
          }
        });
        break;
      case 'delete':
        this.messageBox.confirm({
          title: '删除分类',
          content: `确认删除此分类吗？ [${item.name}]`,
          type: 'warning',
          callback: (msg: XMessageBoxAction) => {
            if (msg !== 'confirm') return;
            this.variableCategoryService.delete(item.id).subscribe((x) => {
              this.message.success(x);
              this.variableCategorys.update((y) => {
                const index = y.indexOf(item);
                y.splice(index, 1);
                return y;
              });
              const { variableCategoryId } = this.form.getRawValue();
              if (variableCategoryId === item.id && this.variableCategorys().length > 0) {
                this.form.patchValue({
                  variableCategoryId: this.variableCategorys()[0].id
                });
              }
              this.cdr.detectChanges();
            });
          }
        });
        break;
    }
  }

  variableCategoryDropCdk(event: CdkDragDrop<VariableCategory[]>) {
    this.variableCategorys.update((x) => {
      moveItemInArray(x, event.previousIndex, event.currentIndex);
      return [...x];
    });
  }

  variableDropCdk(event: CdkDragDrop<Variable[]>) {
    moveItemInArray(this.many.controls, event.previousIndex, event.currentIndex);
    this.many.markAsDirty();
  }

  getVariableCategory() {
    return this.variableCategoryService
      .variableCategorySelect({
        where: { resourceId: { equals: this.resourceId() } },
        orderBy: [{ createdAt: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.variableCategorys.set(x);
          if (!this.form.getRawValue().variableCategoryId && this.variableCategorys().length > 0) {
            this.form.patchValue({ variableCategoryId: this.variableCategorys()[0].id });
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
              y.id = y.code;
              y.label = y.name;
              return y;
            })
          );
        })
      );
  }

  getSchemaList() {
    return this.schema.schemaSelect({}).pipe(
      tap((x) => {
        const res = x.map((y: any) => {
          y.label = y.name;
          return y;
        });
        const group = groupBy(res, (y) => y.code);
        const list: XCascadeNode[] = [];
        for (let key in group) {
          const one = first(group[key]) as Schema;
          list.push({ id: one.code, label: one.name });
          for (let item of AppSortVersions(group[key], 'desc')) {
            list.push({ id: item.id, label: item.version, pid: one.code });
          }
        }
        this.schemaList.set(list);
      })
    );
  }

  save() {
    const value = this.form.getRawValue();
    const { many } = value;
    for (let i = 0; i < many.length; i++) {
      many[i].sort = 100 * (i + 1);
    }
    this.saveLoading.set(true);
    this.variableService
      .saveMany(value)
      .pipe(
        tap((x) => {
          this.message.success(x);
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
        where: { variableCategoryId: { equals: value } },
        orderBy: [{ sort: 'asc' }]
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
    const group = this.fb.group({
      id: [variable?.id ?? ''],
      code: [variable?.code ?? '', [Validators.required]],
      type: [variable?.type ?? ''],
      value: [variable?.value ?? ''],
      sort: [variable?.sort ?? 0],
      description: [variable?.description ?? ''],
      resourceId: [variable?.resourceId ?? this.resourceId()],
      variableCategoryId: [
        variable?.variableCategoryId ?? this.form.getRawValue()['variableCategoryId']
      ]
    });
    this.many.push(group);

    group.controls.type.valueChanges.pipe(takeUntil(this.$destroy)).subscribe(() => {
      group.controls.value.patchValue('');
    });
  }

  remove(i: number) {
    this.many.removeAt(i);
  }
}
