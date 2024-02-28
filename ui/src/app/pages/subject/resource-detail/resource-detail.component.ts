import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
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
  data = inject(X_DIALOG_DATA) as {
    id: string;
    title: string;
    subjectId: string;
    saveSuccess: () => void;
  };
  id = '';
  title = '';
  subjectId = '';
  subjects: XData<XSelectNode> = [];
  resources: XData<XTreeSelectNode> = [];

  formLoading = false;
  saveLoading = false;

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(
    private resource: ResourceService,
    private subject: SubjectService,
    private fb: FormBuilder,
    private message: XMessageService,
    private cdr: ChangeDetectorRef
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
    this.id = id;
    this.title = title;
    this.subjectId = subjectId;
    if (subjectId) this.form.patchValue({ subjectId });
    const request: Observable<any>[] = [this.getSubjectSelect(), this.getResourceSelect()];
    if (this.id) {
      this.form.controls['subjectId'].disable();
      request.push(this.getResource());
    }
    this.formLoading = true;
    forkJoin(request)
      .pipe(
        finalize(() => {
          this.formLoading = false;
          this.cdr.detectChanges();
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
    if (!this.id) {
      rq = this.resource.createResource(this.form.value);
    } else {
      rq = this.resource.updateResource({ id: this.id, ...this.form.value });
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

  getResource() {
    return this.resource.resource(this.id).pipe(
      tap((x) => {
        this.form.patchValue(x);
      })
    );
  }

  getSubjectSelect() {
    return this.subject.subjectSelect().pipe(
      tap((x) => {
        this.subjects = x.map((y) => ({ label: y.name, id: y.id }));
      })
    );
  }

  getResourceSelect() {
    return this.resource.resourceSelect(this.subjectId).pipe(
      tap((x) => {
        this.resources = x.map((y) => ({
          label: y.name,
          id: y.id,
          pid: y.pid,
          disabled: this.id === y.id
        }));
      })
    );
  }
}
