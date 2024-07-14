import { Component, Inject, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { ResourceService, SubjectService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';
import { XData } from '@ng-nest/ui/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { XInputNumberComponent } from '@ng-nest/ui/input-number';
import { XTextareaComponent } from '@ng-nest/ui/textarea';

@Component({
  selector: 'app-resource-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule,
    XTreeSelectComponent,
    XInputNumberComponent,
    XTextareaComponent
  ],
  templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<ResourceDetailComponent>);
  id = signal('');
  title = signal('');
  subjectId = signal('');
  subjects = signal<XData<XSelectNode>>([]);
  resources = signal<XData<XTreeSelectNode>>([]);

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA)
    public data: { id: string; title: string; subjectId: string; saveSuccess: () => void },
    private resource: ResourceService,
    private subject: SubjectService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      pid: [null],
      sort: [0, [Validators.required]],
      description: [null],
      subjectId: [null, [Validators.required]]
    });
    const { id, title, subjectId } = this.data;
    this.id.set(id);
    this.title.set(title);
    this.subjectId.set(subjectId);
    if (subjectId) this.form.patchValue({ subjectId });
    const request: Observable<any>[] = [this.getSubjectSelect(), this.getResourceSelect()];
    this.form.controls['subjectId'].disable();
    if (this.id()) {
      request.push(this.getResource());
    }
    this.formLoading.set(true);
    forkJoin(request)
      .pipe(
        finalize(() => {
          this.formLoading.set(false);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id()) {
      rq = this.resource.create(this.form.getRawValue());
    } else {
      rq = this.resource.update({ id: this.id(), ...this.form.getRawValue() });
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

  getResource() {
    return this.resource.resource(this.id()).pipe(
      tap((x) => {
        this.form.patchValue(x);
      })
    );
  }

  getSubjectSelect() {
    return this.subject.subjectSelect({}).pipe(
      tap((x) => {
        this.subjects.set(x.map((y) => ({ label: y.name, id: y.id })));
      })
    );
  }

  getResourceSelect() {
    return this.resource
      .resourceSelect({ where: { subjectId: { equals: this.subjectId() } } })
      .pipe(
        tap((x) => {
          this.resources.set(
            x.map((y) => ({
              label: y.name,
              id: y.id,
              pid: y.pid,
              disabled: this.id() === y.id
            }))
          );
        })
      );
  }
}
