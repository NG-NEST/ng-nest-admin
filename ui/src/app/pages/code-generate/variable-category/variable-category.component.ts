import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XI18nPipe, XTextareaComponent } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { VariableCategory, VariableCategoryMessage, VariableCategoryService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-variable-category',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XTextareaComponent,
    XDialogModule,
    XI18nPipe
  ],
  templateUrl: './variable-category.component.html'
})
export class VariableCategoryComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<VariableCategoryComponent>);
  data = inject<{
    id: string;
    resourceId: string;
    saveSuccess: (variableCategory: VariableCategory) => void;
  }>(X_DIALOG_DATA);
  fb = inject(FormBuilder);
  variableCategory = inject(VariableCategoryService);
  message = inject(XMessageService);
  id = signal('');
  resourceId = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor() {
    const { id, resourceId } = this.data;
    this.id.set(id);
    this.resourceId.set(resourceId);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      sort: [0],
      description: [null],
      resourceId: [this.resourceId(), [Validators.required]]
    });

    if (this.id()) {
      this.formLoading.set(true);
      this.variableCategory
        .variableCategory(this.id())
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
    let rq!: Observable<VariableCategory>;
    let msg = '';
    if (!this.id()) {
      rq = this.variableCategory.create(this.form.value);
      msg = VariableCategoryMessage.CreatedSuccess;
    } else {
      rq = this.variableCategory.update({ id: this.id(), ...this.form.value });
      msg = VariableCategoryMessage.UpdatedSuccess;
    }
    this.saveLoading.set(true);
    rq.pipe(
      tap((x) => {
        this.message.success(msg);
        this.dialogRef.close();
        this.data.saveSuccess(x);
      }),
      finalize(() => {
        this.saveLoading.set(false);
      })
    ).subscribe();
  }
}
