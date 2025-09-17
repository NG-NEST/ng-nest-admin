import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { ModelService, ResourceService } from '@ui/api';
import { tap } from 'rxjs';
import { X_DIALOG_DATA, XDialogModule } from '@ng-nest/ui/dialog';
import { XBubbleComponent, XBubblesComponent } from '@ng-nest/ui/bubble';
import { XSenderComponent } from '@ng-nest/ui/sender';

@Component({
  selector: 'ai-dialog',
  imports: [
    ReactiveFormsModule,
    XDialogModule,
    XButtonComponent,
    XSelectComponent,
    XLoadingComponent,
    XBubbleComponent,
    XBubblesComponent,
    XSenderComponent
  ],
  templateUrl: './ai-dialog.component.html',
  styleUrls: ['./ai-dialog.component.scss']
})
export class AiDialogComponent {
  formBuilder = inject(FormBuilder);
  resourceService = inject(ResourceService);
  modelService = inject(ModelService);

  data = inject<{
    title: string;
    modelType: string;
    modelId: string;
    system: string;
    user: string;
  }>(X_DIALOG_DATA);

  title = model<string>('');

  formLoading = signal(false);
  saveLoading = signal(false);

  modelTypeList = signal<XSelectNode[]>([]);
  modelList = signal<XSelectNode[]>([]);

  form = this.formBuilder.group({
    modelType: ['', Validators.required],
    modelId: ['', Validators.required],
    user: ['']
  });

  ngOnInit() {
    this.getModelTypeList().subscribe();
    this.form.get('modelType')!.valueChanges.subscribe((modelType) => {
      this.getModelList(modelType!).subscribe();
    });

    this.title.set(this.data.title);

    this.form.patchValue({
      modelType: this.data.modelType,
      modelId: this.data.modelId,
      user: this.data.user
    });
  }

  getModelTypeList() {
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

  send() {}
}
