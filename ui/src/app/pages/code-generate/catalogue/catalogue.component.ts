import { Component, Inject, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
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
import { Catalogue, CatalogueMessage, CatalogueService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';

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
    XTooltipDirective
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<CatalogueComponent>);
  id = signal('');
  resourceId = signal('');
  pid = signal<null | string>(null);
  type = signal('');

  treeData = signal<XTreeNode[]>([]);

  title = computed(() => {
    if (this.type() === 'add-root') return '添加根节点';
    if (this.type() === 'add-child') return '添加子节点';
    if (this.type() === 'edit') return '编辑节点';
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
  constructor(
    @Inject(X_DIALOG_DATA)
    public data: {
      id: string;
      type: string;
      sort: number;
      resourceId: string;
      pid: string;
      saveSuccess: (node: Catalogue) => void;
    },
    private catalogue: CatalogueService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {
    const { id, resourceId, pid, type } = this.data;
    this.id.set(id);
    this.type.set(type);
    this.resourceId.set(resourceId);
    this.pid.set(pid);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['Folder', [Validators.required]],
      pid: [{ disabled: true, value: this.pid() }],
      name: ['', [Validators.required]],
      resourceId: [this.resourceId(), [Validators.required]],
      sort: [0, [Validators.required]],
      description: ['']
    });

    this.getCatalogues(this.resourceId()).subscribe();

    if (this.id()) {
      this.formLoading.set(true);
      this.catalogue
        .catalogue(this.id())
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
