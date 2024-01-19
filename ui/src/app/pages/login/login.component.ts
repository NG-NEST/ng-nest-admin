import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';
import { AuthService } from '@ui/api';
import { AppAuthService } from '@ui/core';
import { XStorageService } from '@ng-nest/ui/core';
import { Router } from '@angular/router';
import { delay, finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, XInputComponent, XButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  auth = inject(AppAuthService);
  authService = inject(AuthService);
  message = inject(XMessageService);
  storage = inject(XStorageService);
  fb = inject(FormBuilder);
  router = inject(Router);
  loginLoading = signal(false);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    const { account, password } = this.form.value;
    if (!account) {
      this.message.warning('请输入账号！');
      return;
    }
    if (!password) {
      this.message.warning('请输入密码！');
      return;
    }
    this.loginLoading.set(true);
    this.authService
      .login(this.form.value)
      .pipe(
        delay(1000),
        finalize(() => this.loginLoading.set(false))
      )
      .subscribe((x) => {
        const { accessToken, refreshToken } = x;
        this.auth.accessToken.set(accessToken);
        this.auth.refreshToken.set(refreshToken);
        this.router.navigateByUrl('/index/overview');
      });
  }
}
