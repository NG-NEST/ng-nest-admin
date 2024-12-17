import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XData } from '@ng-nest/ui/core';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { Resource, RoleService, SubjectService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-role-permission',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule,
    XTableComponent
  ],
  templateUrl: './role-permission.component.html'
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
    { id: 'permission', label: '许可', flex: 1.5 }
  ]);

  resources = signal<Resource[]>([]);

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA) public data: { id: string; saveSuccess: () => void },
    private role: RoleService,
    private subject: SubjectService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subjectCode: [null, [Validators.required]]
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
    return this.subject
      .subjectResources({
        where: { subject: { code: { equals: this.form.getRawValue().subjectCode } } }
      })
      .pipe(
        tap((x) => {
          this.resources.set(x);
        })
      );
  }

  getRolePermission() {
    this.role.role(this.id()).pipe(tap(() => {}));
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id()) {
      rq = this.role.create(this.form.value);
    } else {
      rq = this.role.update({ id: this.id(), ...this.form.value });
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
