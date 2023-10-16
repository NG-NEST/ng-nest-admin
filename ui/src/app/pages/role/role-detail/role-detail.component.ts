import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui';
import { XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { RoleService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html'
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<RoleDetailComponent>);
  data = inject(X_DIALOG_DATA) as { id: string; saveSuccess: () => void };
  id = '';

  formLoading = false;
  saveLoading = false;

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(private role: RoleService, private fb: FormBuilder, private message: XMessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      description: [null]
    });
    const { id } = this.data;
    this.id = id;
    if (this.id) {
      this.formLoading = true;
      this.role
        .role(this.id)
        .pipe(tap(() => (this.formLoading = false)))
        .subscribe((x) => {
          this.form.patchValue(x);
        });
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id) {
      rq = this.role.createRole(this.form.value);
    } else {
      rq = this.role.updateRole(this.id, this.form.value);
    }
    this.saveLoading = true;
    rq.pipe(finalize(() => (this.saveLoading = false))).subscribe((x) => {
      this.message.success(x);
      this.dialogRef.close();
      this.data.saveSuccess();
    });
  }
}
