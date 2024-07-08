import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { XTextareaComponent } from '@ng-nest/ui/textarea';
import { SubjectService } from '@ui/api';
import { Observable, Subject, finalize } from 'rxjs';

@Component({
  selector: 'app-subject-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XTextareaComponent
  ],
  templateUrl: './subject-detail.component.html'
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<SubjectDetailComponent>);
  id = '';
  title = '';

  formLoading = false;
  saveLoading = false;

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA) public data: { id: string; title: string; saveSuccess: () => void },
    private subject: SubjectService,
    private fb: FormBuilder,
    private message: XMessageService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null]
    });
    const { id, title } = this.data;
    this.id = id;
    this.title = title;
    if (this.id) {
      this.formLoading = true;
      this.subject
        .subject(this.id)
        .pipe(finalize(() => (this.formLoading = false)))
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
      rq = this.subject.create(this.form.value);
    } else {
      rq = this.subject.update({ id: this.id, ...this.form.value });
    }
    this.saveLoading = true;
    rq.pipe(
      finalize(() => {
        this.saveLoading = false;
        this.cdr.detectChanges();
      })
    ).subscribe((x) => {
      this.message.success(x);
      this.dialogRef.close();
      this.data.saveSuccess();
    });
  }
}
