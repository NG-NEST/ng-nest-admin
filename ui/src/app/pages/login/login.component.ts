import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@ui/api';
import { AppAuthService } from '@ui/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  auth = inject(AppAuthService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      account: ['admin', [Validators.required]],
      password: ['11223344', [Validators.required]]
    });

    this.authService.login(this.form.value).subscribe((x) => {
      console.log(x);
    });
  }
}
