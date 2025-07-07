import { Component, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  XCascadeComponent,
  XCascadeNode,
  XIconComponent,
  XInputNumberComponent,
  XRadioComponent,
  XTextareaComponent,
  XTooltipDirective,
  XTreeNode,
  XTreeSelectComponent
} from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { Catalogue, CatalogueMessage, CatalogueService, VariableService } from '@ui/api';
import { first, groupBy } from 'lodash-es';
import { Observable, Subject, finalize, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XRadioComponent,
    XTreeSelectComponent,
    XInputNumberComponent,
    XTextareaComponent,
    XIconComponent,
    XTooltipDirective,
    XCascadeComponent
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<CatalogueComponent>);
  data = inject<{
    id: string;
    type: string;
    resourceId: string;
    pid: string;
    saveSuccess: (node: Catalogue) => void;
  }>(X_DIALOG_DATA);
  private catalogue = inject(CatalogueService);
  private variable = inject(VariableService);
  private fb = inject(FormBuilder);
  private message = inject(XMessageService);

  id = signal('');
  resourceId = signal('');
  pid = signal<null | string>(null);
  type = signal('');

  treeData = signal<XTreeNode[]>([]);
  variableList = signal<XCascadeNode[]>([]);

  title = computed(() => {
    if (this.type() === 'add-root') return '添加根节点';
    if (this.type() === 'add-child') return '添加子节点';
    if (this.type() === 'edit') return '修改节点';
    return '';
  });

  get typeName() {
    const { type } = this.form.getRawValue();
    if (type === 'Folder') return '文件夹名称';
    else if (type === 'File') return '文件名称';
    return '';
  }

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor() {
    const { id, resourceId, pid, type } = this.data;
    this.id.set(id);
    this.type.set(type);
    this.resourceId.set(resourceId);
    this.pid.set(pid);
    this.form = this.fb.group({
      type: ['Folder', [Validators.required]],
      pid: [{ disabled: true, value: this.pid() }],
      name: ['', [Validators.required]],
      many: [false],
      variableId: [null],
      resourceId: [this.resourceId(), [Validators.required]],
      sort: [0, [Validators.required]],
      description: ['']
    });

    this.form.controls['type'].valueChanges.pipe(takeUntil(this.$destroy)).subscribe((x) => {
      const many = this.form.controls['many'];
      many.clearValidators();
      if (x === 'File') {
        many.addValidators(Validators.required);
      }
      many.updateValueAndValidity();
    });

    this.form.controls['many'].valueChanges.pipe(takeUntil(this.$destroy)).subscribe((x) => {
      const variableId = this.form.controls['variableId'];
      variableId.clearValidators();
      if (x === true) {
        variableId.addValidators(Validators.required);
      }
      variableId.updateValueAndValidity();
    });
  }

  ngOnInit(): void {
    this.getCatalogues(this.resourceId()).subscribe();
    this.getVariables(this.resourceId()).subscribe();

    if (this.id()) {
      this.formLoading.set(true);
      this.catalogue
        .catalogue(this.id())
        .pipe(
          tap((x) => {
            this.form.patchValue(x);

            this.setManyChange();
          }),
          finalize(() => this.formLoading.set(false))
        )
        .subscribe();
    } else {
      this.setManyChange();
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  setManyChange() {
    this.form.controls['many'].valueChanges.pipe(takeUntil(this.$destroy)).subscribe((x) => {
      const { variableId } = this.form.controls;
      variableId.clearValidators();
      if (x === true) {
        variableId.addValidators(Validators.required);
      }
      variableId.patchValue(null);
      this.form.updateValueAndValidity();
    });
  }

  getCatalogues(resourceId: string) {
    return this.catalogue
      .catalogueSelect({
        where: { resourceId: { equals: resourceId! } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((y) =>
          this.treeData.set(
            y.map((z: any) => {
              z.label = z.name;
              return z;
            })
          )
        )
      );
  }

  getVariables(resourceId: string) {
    return this.variable
      .typeVariables({
        resourceId: resourceId,
        type: 'json-schema',
        schemaType: 'array'
      })
      .pipe(
        tap((x) => {
          const group = groupBy(x, (y) => {
            y.variableCategoryId;
          });
          const variables: XCascadeNode[] = [];
          for (let key in group) {
            const one = first(group[key])!;
            variables.push({ id: one.variableCategoryId, label: one.variableCategory.name });
            for (let item of group[key]) {
              variables.push({ pid: one.variableCategoryId, id: item.id, label: item.code });
            }
          }

          this.variableList.set(variables);
        })
      );
  }

  save() {
    let rq!: Observable<Catalogue>;
    const value = this.form.getRawValue();
    let msg = '';
    if (!this.id()) {
      msg = CatalogueMessage.CreatedSuccess;
      rq = this.catalogue.create(value);
    } else {
      msg = CatalogueMessage.UpdatedSuccess;
      rq = this.catalogue.update({ id: this.id(), ...value });
    }
    this.saveLoading.set(true);
    rq.pipe(
      tap((x) => {
        this.message.success(msg);
        this.dialogRef.close();
        this.data.saveSuccess(x);
      }),
      finalize(() => {
        this.saveLoading.set(false);
      })
    ).subscribe();
  }
}
