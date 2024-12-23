import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XData } from '@ng-nest/ui/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { ResourceService, RoleService, SubjectService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';
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

  get list() {
    return this.form.get('list') as FormArray;
  }

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA) public data: { id: string; saveSuccess: () => void },
    private role: RoleService,
    private subject: SubjectService,
    private resource: ResourceService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subjectCode: [null, [Validators.required]],
      list: this.fb.array([])
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

  getSubjectSelect() {
    return this.subject.subjectSelect({}).pipe(
      tap((x) => {
        this.subjects.set(x.map((y) => ({ label: y.name, id: y.code })));
        if (x.length > 0) {
          this.form.patchValue({ subjectCode: x[0].code! });
          this.getSubjectResources().subscribe();
        }
      })
    );
  }

  getSubjectResources() {
    return this.resource
      .resourceSelect({
        where: { subject: { code: { equals: this.form.getRawValue().subjectCode } } },
        orderBy: [{ sort: 'asc' }],
        include: { permissions: { orderBy: [{ sort: 'asc' }] } }
      })
      .pipe(
        tap((x) => {
          for (let resource of x) {
            resource;
            this.list.push(
              this.fb.group({
                permissions: [[]]
              })
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
                  return { id: z.code, label: z.name };
                })
              };
            })
          );
        })
      );
  }

  getRolePermission() {
    this.role.role(this.id()).pipe(tap(() => {}));
  }

  save() {
    const permissions: string[] = [];
    for (let item of this.form.value.list) {
      permissions.push(...item.permissions);
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
