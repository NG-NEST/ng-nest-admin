import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XSelectModule, XSelectNode } from '@ng-nest/ui/select';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { ModelService, ResourceService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-model-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XSelectModule
  ],
  templateUrl: './model-detail.component.html'
})
export class ModelDetailComponent implements OnInit, OnDestroy {
  data = inject<{ id: string; saveSuccess: () => void }>(X_DIALOG_DATA);
  model = inject(ModelService);
  resourceService = inject(ResourceService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  dialogRef = inject(XDialogRef<ModelDetailComponent>);
  id = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;
  platformList = signal<XSelectNode[]>([]);

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      code: [null, [Validators.required]],
      platform: [null, [Validators.required]],
      description: [null]
    });
    const { id } = this.data;
    this.id.set(id);

    const req: Observable<any>[] = [this.getModelTypeList()];

    if (this.id()) {
      req.push(
        this.model.model(this.id()).pipe(
          tap((x) => {
            this.form.patchValue(x);
          })
        )
      );
    }
    this.formLoading.set(true);
    forkJoin(req)
      .pipe(finalize(() => this.formLoading.set(false)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id()) {
      rq = this.model.create(this.form.value);
    } else {
      rq = this.model.update({ id: this.id(), ...this.form.value });
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

  getModelTypeList() {
    return this.resourceService
      .resourceSelect({
        where: { subject: { code: { equals: 'model-platform' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.platformList.set(x.map(({ code, name }) => ({ id: code, label: name })));
        })
      );
  }
}
