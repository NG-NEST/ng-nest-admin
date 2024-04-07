import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { RoleService, UserService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';
import { XData } from '@ng-nest/ui/core';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule
  ],
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<UserDetailComponent>);
  data = inject(X_DIALOG_DATA) as { id: string; saveSuccess: () => void };
  user = inject(UserService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  role = inject(RoleService);
  roles: XData<XSelectNode> = [];

  id = '';

  formLoading = false;
  saveLoading = false;

  form!: FormGroup;

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.role.roleSelect({}).subscribe((x) => {
      this.roles = x.map((y) => ({ label: y.name, id: y.id }));
    });
    const { id } = this.data;
    this.id = id;
    if (!this.id) {
      this.form = this.fb.group({
        name: [null, [Validators.required]],
        account: [null, [Validators.required]],
        password: [null, [Validators.required]],
        checkPassword: [null, [Validators.required, this.confirmationValidator]],
        email: [null, [Validators.required]],
        roleIds: [null, [Validators.required]],
        phone: [null]
      });
      return;
    } else {
      this.form = this.fb.group({
        name: [null, [Validators.required]],
        account: [{ value: '', disabled: true }],
        email: [null, [Validators.required]],
        roleIds: [null, [Validators.required]],
        phone: [null]
      });
    }
    this.formLoading = true;
    this.user
      .user(this.id)
      .pipe(tap(() => (this.formLoading = false)))
      .subscribe((x) => {
        this.form.patchValue({ ...x, roleIds: x.roles?.map((y) => y.roleId) });
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    const value = this.form.getRawValue();
    delete value.checkPassword;
    if (!this.id) {
      rq = this.user.create(value);
    } else {
      rq = this.user.update({ id: this.id, ...value });
    }
    this.saveLoading = true;
    rq.pipe(finalize(() => (this.saveLoading = false))).subscribe((x) => {
      this.message.success(x);
      this.dialogRef.close();
      this.data.saveSuccess();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!this.passwordCheck(control.value)) {
      return { confirm: true, error: true };
    }
    return {};
  };

  passwordCheck = (value: string) => {
    return value === this.form.controls['password'].value;
  };
}
