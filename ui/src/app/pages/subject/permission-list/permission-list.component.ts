import { Component, Inject, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { Permission, PermissionService, PermissionWhereInput } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';
import { XData } from '@ng-nest/ui/core';
import { XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XMessageService } from '@ng-nest/ui/message';
import { XEmptyComponent } from '@ng-nest/ui/empty';
import { AppAuthDirective, AppAuthService } from '@ui/core';

@Component({
  selector: 'app-permission-list',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XInputNumberComponent,
    XEmptyComponent,
    AppAuthDirective
  ],
  templateUrl: './permission-list.component.html'
})
export class PermissionListComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<PermissionListComponent>);
  id = signal('');
  code = signal('');
  title = signal('');
  resources = signal<XData<XTreeSelectNode>>([]);

  formLoading = signal(false);
  saveLoading = signal(false);

  form = this.fb.group({
    list: this.fb.array<Permission>([])
  });

  get list() {
    return this.form.get('list') as FormArray;
  }

  get isEmpty() {
    return !this.formLoading() && this.list.length === 0;
  }

  hasPermissionEdit = computed(() => {
    return this.auth.hasPermission('permission-edit');
  });

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA)
    public data: {
      id: string;
      code: string;
      title: string;
      subjectId: string;
      saveSuccess: () => void;
    },
    private permission: PermissionService,
    private fb: FormBuilder,
    private message: XMessageService,
    private auth: AppAuthService
  ) {}

  ngOnInit(): void {
    const { id, title, code } = this.data;
    this.id.set(id);
    this.code.set(code);
    this.title.set(title);

    const request: Observable<any>[] = [];
    if (this.id()) {
      request.push(this.getPermissionList());
    }
    this.formLoading.set(true);
    forkJoin(request)
      .pipe(
        finalize(() => {
          this.formLoading.set(false);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    const many = this.form.getRawValue().list as Permission[];
    this.saveLoading.set(true);
    this.permission
      .saveMany({ many, resourceId: this.id() })
      .pipe(
        tap((x) => {
          this.message.success(x);
          this.dialogRef.close();
          this.data.saveSuccess();
        }),
        finalize(() => {
          this.saveLoading.set(false);
        })
      )
      .subscribe();
  }

  getPermissionList() {
    const where: PermissionWhereInput = {
      resourceId: { contains: this.id() }
    };
    return this.permission.permissionSelect({ where, orderBy: [{ sort: 'asc' }] }).pipe(
      tap((x) => {
        for (let permission of x) {
          this.add(permission);
        }
        if (!this.hasPermissionEdit()) {
          this.list.disable();
        }
        this.form.patchValue({ list: x });
      })
    );
  }

  add(permission?: Permission) {
    this.list.push(
      this.fb.group({
        id: [permission?.id ?? ''],
        name: [permission?.name ?? '', [Validators.required]],
        code: [permission?.code ?? this.code() + '-', [Validators.required]],
        description: [permission?.description ?? ''],
        sort: [permission?.sort ?? 0, [Validators.required]],
        resourceId: [permission?.resourceId ?? this.id()]
      })
    );
  }

  remove(i: number) {
    this.list.removeAt(i);
  }
}
