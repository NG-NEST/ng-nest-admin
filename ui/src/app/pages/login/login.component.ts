import { Component, ElementRef, Renderer2, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';
import { AuthService } from '@ui/api';
import { AppAuthService } from '@ui/core';
import { XStorageService } from '@ng-nest/ui/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, finalize } from 'rxjs';
import { isEmpty } from 'lodash-es';
import { XI18nPipe, XI18nService } from '@ng-nest/ui/i18n';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, XInputComponent, XButtonComponent, XI18nPipe],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  auth = inject(AppAuthService);
  authService = inject(AuthService);
  message = inject(XMessageService);
  storage = inject(XStorageService);
  i18n = inject(XI18nService);
  fb = inject(FormBuilder);
  renderer = inject(Renderer2);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  appid = signal('');
  loginLoading = signal(false);
  codekey!: string;
  redirect = signal('');

  @ViewChild('svgEle', { static: true }) svgEle!: ElementRef<HTMLDivElement>;

  form!: FormGroup;

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((x) => {
      const { redirect, appid } = x;
      this.appid.set(appid);
      this.redirect.set(redirect);
    });
    this.form = this.fb.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
    this.getCaptcha();
  }

  getCaptcha() {
    this.codekey = Math.random().toString(36).slice(2);
    this.authService.captcha(this.codekey).subscribe((x) => {
      this.svgEle.nativeElement.innerHTML = x;
    });
  }

  submit() {
    const { account, password, code } = this.form.value;
    if (isEmpty(account)) {
      this.message.warning(this.i18n.translate('login.please-input-account'));
      return;
    }
    if (isEmpty(password)) {
      this.message.warning(this.i18n.translate('login.please-input-password'));
      return;
    }
    if (isEmpty(code)) {
      this.message.warning(this.i18n.translate('login.please-input-code'));
      return;
    }
    this.loginLoading.set(true);
    this.authService
      .login(this.form.value, { codekey: this.codekey })
      .pipe(
        delay(1000),
        finalize(() => this.loginLoading.set(false))
      )
      .subscribe({
        next: (x) => {
          const { accessToken, refreshToken } = x;
          this.auth.accessToken.set(accessToken);
          this.auth.refreshToken.set(refreshToken);
          if (this.redirect()) {
            location.href = `${this.redirect()}?accessToken=${accessToken}`;
          } else {
            this.router.navigateByUrl('/');
          }
        },
        error: () => {
          this.getCaptcha();
        }
      });
  }
}
