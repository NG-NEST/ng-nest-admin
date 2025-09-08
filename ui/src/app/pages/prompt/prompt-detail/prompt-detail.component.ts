import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XSelectModule, XSelectNode } from '@ng-nest/ui/select';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { ModelService, PromptService, ResourceService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-prompt-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XSelectModule
  ],
  templateUrl: './prompt-detail.component.html'
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  data = inject<{ id: string; saveSuccess: () => void }>(X_DIALOG_DATA);
  prompt = inject(PromptService);
  resourceService = inject(ResourceService);
  modelService = inject(ModelService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  dialogRef = inject(XDialogRef<PromptDetailComponent>);
  id = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;
  modelTypeList = signal<XSelectNode[]>([]);
  modelList = signal<XSelectNode[]>([]);

  $destroy = new Subject<void>();

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      system: [null],
      user: [null, [Validators.required]],
      modelType: [null, [Validators.required]],
      modelId: [null, [Validators.required]],
      description: [null]
    });
    const { id } = this.data;
    this.id.set(id);

    this.form.get('modelType')!.valueChanges.subscribe((modelType) => {
      this.getModelList(modelType).subscribe();
    });

    const req: Observable<any>[] = [this.getPromptTypeList()];

    if (this.id()) {
      req.push(
        this.prompt.prompt(this.id()).pipe(
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
      rq = this.prompt.create(this.form.value);
    } else {
      rq = this.prompt.update({ id: this.id(), ...this.form.value });
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

  getPromptTypeList() {
    return this.resourceService
      .resourceSelect({
        where: { subject: { code: { equals: 'model-type' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.modelTypeList.set(x.map(({ code, name }) => ({ id: code, label: name })));
        })
      );
  }

  getModelList(type: string) {
    return this.modelService.modelSelect({ where: { type: { equals: type } } }).pipe(
      tap((x) => {
        this.modelList.set(x.map(({ id, name }) => ({ id: id, label: name })));
      })
    );
  }
}
