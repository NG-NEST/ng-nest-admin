import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui';
import { XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { UserService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<UserDetailComponent>);
  data = inject(X_DIALOG_DATA) as { id: string; saveSuccess: () => void };
  id = '';

  formLoading = false;
  saveLoading = false;

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(private user: UserService, private fb: FormBuilder, private message: XMessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      account: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      email: [null, [Validators.required]],
      phone: [null],
      roles: [null]
    });
    const { id } = this.data;
    this.id = id;
    if (!this.id) return;
    this.formLoading = true;
    this.user
      .user(this.id)
      .pipe(tap(() => (this.formLoading = false)))
      .subscribe((x) => {
        this.form.patchValue(x);
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id) {
      rq = this.user.createUser(this.form.value);
    } else {
      rq = this.user.updateUser(this.id, this.form.value);
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
    } else if (this.passwordCheck(control.value)) {
      return { confirm: true, error: true };
    }
    return {};
  };

  passwordCheck = (value: string) => {
    return value === this.form.controls['password'].value;
  };
}
