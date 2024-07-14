import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { RoleService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-role-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule
  ],
  templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<RoleDetailComponent>);
  id = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA) public data: { id: string; saveSuccess: () => void },
    private role: RoleService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
    const { id } = this.data;
    this.id.set(id);
    if (this.id()) {
      this.formLoading.set(true);
      this.role
        .role(this.id())
        .pipe(
          tap((x) => {
            this.form.patchValue(x);
          }),
          finalize(() => this.formLoading.set(false))
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
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
