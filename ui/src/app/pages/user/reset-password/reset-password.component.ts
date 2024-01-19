import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { UserService } from '@ui/api';
import { Subject, finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule
  ],
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<ResetPasswordComponent>);
  data = inject(X_DIALOG_DATA) as { id: string; saveSuccess: () => void };
  user = inject(UserService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);

  id = '';

  formLoading = false;
  saveLoading = false;

  form!: FormGroup;

  $destroy = new Subject<void>();

  ngOnInit(): void {
    const { id } = this.data;
    this.id = id;
    this.form = this.fb.group({
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    const value = this.form.getRawValue();
    delete value.checkPassword;
    this.saveLoading = true;
    this.user
      .resetPassword(this.id, value)
      .pipe(finalize(() => (this.saveLoading = false)))
      .subscribe((x) => {
        this.message.success(x);
        this.dialogRef.close();
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
