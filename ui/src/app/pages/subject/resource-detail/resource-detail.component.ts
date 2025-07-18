import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
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
import { XRadioComponent, XRadioNode } from '@ng-nest/ui/radio';
import { XSwitchComponent } from '@ng-nest/ui/switch';

@Component({
  selector: 'app-resource-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XSelectComponent,
    XDialogModule,
    XTreeSelectComponent,
    XInputNumberComponent,
    XTextareaComponent,
    XRadioComponent,
    XSwitchComponent
  ],
  templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent implements OnInit, OnDestroy {
  data = inject<{ id: string; title: string; subjectId: string; saveSuccess: () => void }>(
    X_DIALOG_DATA
  );
  resource = inject(ResourceService);
  subject = inject(SubjectService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);

  dialogRef = inject(XDialogRef<ResourceDetailComponent>);
  id = signal('');
  title = signal('');
  subjectId = signal('');
  subjects = signal<XData<XSelectNode>>([]);
  resources = signal<XData<XTreeSelectNode>>([]);
  typeList = signal<XData<XRadioNode>>([]);

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();

  constructor() {
    this.form = this.fb.group({
      type: ['string', []],
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      pid: [null],
      sort: [0, [Validators.required]],
      icon: [null],
      description: [null],
      subjectId: [null, [Validators.required]]
    });
    const { id, title, subjectId } = this.data;
    this.id.set(id);
    this.title.set(title);
    this.subjectId.set(subjectId);
    if (subjectId) this.form.patchValue({ subjectId });
  }

  ngOnInit(): void {
    const request: Observable<any>[] = [
      this.getSubjectSelect(),
      this.getResourceSelect(),
      this.getTypeList()
    ];
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

  getTypeList() {
    return this.resource
      .resourceSelect({
        where: { subject: { code: { equals: 'resource-type' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.typeList.set(
            x.map((y) => ({
              label: y.name,
              id: y.code
            }))
          );
        })
      );
  }
}
