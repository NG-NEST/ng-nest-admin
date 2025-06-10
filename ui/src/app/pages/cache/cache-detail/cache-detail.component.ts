import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { CacheService } from '@ui/api';
import { Subject, finalize } from 'rxjs';

@Component({
  selector: 'app-cache-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule
  ],
  templateUrl: './cache-detail.component.html'
})
export class CacheDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<CacheDetailComponent>);
  cache = inject(CacheService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);

  id = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();

  constructor(@Inject(X_DIALOG_DATA) public data: { id: string; saveSuccess: () => void }) {}

  ngOnInit(): void {
    const { id } = this.data;
    this.id.set(id);
    if (!id) {
      this.form = this.fb.group({
        name: [null, [Validators.required]]
      });
      return;
    } else {
      this.form = this.fb.group({
        name: [null, [Validators.required]]
      });
    }
    this.formLoading.set(true);
    this.cache
      .cache(this.id())
      .pipe(finalize(() => this.formLoading.set(false)))
      .subscribe((x) => {
        this.form.patchValue({ ...x });
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
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
