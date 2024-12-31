import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XData } from '@ng-nest/ui/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { Permission, ResourceService, RoleService, SubjectService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, mergeMap, of, tap } from 'rxjs';
import { XCheckboxComponent } from '@ng-nest/ui/checkbox';

@Component({
  selector: 'app-role-permission',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule,
    XTableComponent,
    XCheckboxComponent
  ],
  templateUrl: './role-permission.component.html',
  styleUrls: ['./role-permission.component.scss']
})
export class RolePermissionComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<RolePermissionComponent>);
  id = signal('');
  subjects = signal<XData<XSelectNode>>([]);

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  columns = signal<XTableColumn[]>([
    { id: 'name', label: '资源', type: 'expand', flex: 1 },
    { id: 'permissions', label: '许可', flex: 2 }
  ]);

  resources = signal<
    { name: string; code: string; permissions: { id: string; label: string }[] }[]
  >([]);

  get permissions() {
    return this.form.get('permissions') as FormGroup;
  }

  rolePermisions = signal<Permission[]>([]);

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA) public data: { id: string; saveSuccess: () => void },
    private role: RoleService,
    private subject: SubjectService,
    private resource: ResourceService,
    private fb: FormBuilder,
    private message: XMessageService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      subjectId: [null, [Validators.required]],
      permissions: this.fb.group({})
    });
    const { id } = this.data;
    this.id.set(id);
    const request: Observable<any>[] = [this.getSubjectSelect()];

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

  subjectChange() {
    this.formLoading.set(true);
    this.getRolePermissions().pipe(
      finalize(() => {
        this.formLoading.set(false);
      })
    ).subscribe()
  }

  getRolePermissions() {
    return this.role.rolePermissions(this.id(), this.form.getRawValue().subjectId).pipe(
      mergeMap((x) => {
        this.rolePermisions.set(x);
        return this.getSubjectResources();
      })
    );
  }

  getSubjectSelect() {
    return this.subject.subjectSelect({}).pipe(
      mergeMap((x) => {
        this.subjects.set(x.map((y) => ({ label: y.name, id: y.id })));
        if (x.length > 0) {
          this.form.patchValue({ subjectId: x[0].id! });
          return this.getRolePermissions();
        } else {
          return of();
        }
      })
    );
  }

  getSubjectResources() {
    return this.resource
      .resourceSelect({
        where: { subject: { id: { equals: this.form.getRawValue().subjectId } } },
        orderBy: [{ sort: 'asc' }],
        include: { permissions: { orderBy: [{ sort: 'asc' }] } }
      })
      .pipe(
        mergeMap((x) => {
          for (let resource of x) {
            const resourcePermissions = this.rolePermisions().filter(
              (y) => y.resourceId === resource.id
            );
            this.permissions.addControl(
              resource.id,
              new FormControl(resourcePermissions.map((y) => y.id))
            );
          }
          this.resources.set(
            x.map((y) => {
              return {
                id: y.id,
                pid: y.pid,
                name: y.name,
                code: y.code,
                permissions: y.permissions!.map((z) => {
                  return { id: z.id, label: z.name };
                })
              };
            })
          );
          return of(true);
        })
      );
  }

  save() {
    const permissions: string[] = [];
    for (let permission in this.form.value.permissions) {
      permissions.push(...this.form.value.permissions[permission]);
    }
    this.saveLoading.set(true);
    this.role
      .updatePermissions(this.id(), permissions)
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
}
