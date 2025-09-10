import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  inject,
  signal,
  viewChild
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XInputComponent } from '@ng-nest/ui/input';
import { AuthService } from '@ui/api';
import { AppAuthService, AppLocaleService, AppThemeService } from '@ui/core';
import { XStorageService } from '@ng-nest/ui/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { isEmpty } from 'lodash-es';
import { XI18nPipe, XI18nService } from '@ng-nest/ui/i18n';
import { XSelectComponent } from '@ng-nest/ui/select';
import { XSwitchComponent } from '@ng-nest/ui/switch';
import { XIconComponent } from '@ng-nest/ui/icon';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    XInputComponent,
    XButtonComponent,
    XI18nPipe,
    XSelectComponent,
    XSwitchComponent,
    XIconComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  auth = inject(AppAuthService);
  authService = inject(AuthService);
  message = inject(XMessageService);
  storage = inject(XStorageService);
  locale = inject(AppLocaleService);
  theme = inject(AppThemeService);
  cdr = inject(ChangeDetectorRef);
  i18n = inject(XI18nService);
  fb = inject(FormBuilder);
  renderer = inject(Renderer2);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  appid = signal('');
  loginLoading = signal(false);
  codekey = signal('');
  redirect = signal('');
  lang = signal(this.locale.lang);

  svgEle = viewChild.required<ElementRef<HTMLDivElement>>('svgEle');

  form!: FormGroup;

  langs = [
    { label: '简体中文', id: 'zh_CN' },
    { label: 'English', id: 'en_US' }
  ];

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
    this.codekey.set(Math.random().toString(36).slice(2));
    this.authService.captcha(this.codekey()).subscribe((x) => {
      this.svgEle().nativeElement.innerHTML = x;
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
      .login(this.form.value, { codekey: this.codekey() })
      .pipe(
        tap((x) => {
          const { accessToken, refreshToken } = x;
          this.auth.accessToken.set(accessToken);
          this.auth.refreshToken.set(refreshToken);
          if (this.redirect()) {
            location.href = `${this.redirect()}?accessToken=${accessToken}`;
          } else {
            this.router.navigateByUrl('/');
          }
        }),
        finalize(() => this.loginLoading.set(false))
      )
      .subscribe({
        error: () => {
          this.getCaptcha();
        }
      });
  }

  changeLang(lang: string) {
    this.locale.lang = lang;
    this.locale.setLocale(lang).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  darkChanged(dark: boolean) {
    this.theme.setDark(dark);
  }
}
