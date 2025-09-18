import { Component, inject, model, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XButtonComponent } from '@ng-nest/ui/button';
import { ModelService, ResourceService } from '@ui/api';
import { X_DIALOG_DATA, XDialogModule } from '@ng-nest/ui/dialog';

@Component({
  selector: 'ai-dialog',
  imports: [ReactiveFormsModule, XDialogModule, XButtonComponent, XLoadingComponent],
  templateUrl: './ai-dialog.component.html',
  styleUrls: ['./ai-dialog.component.scss']
})
export class AiDialogComponent {
  formBuilder = inject(FormBuilder);
  resourceService = inject(ResourceService);
  modelService = inject(ModelService);

  data = inject<{}>(X_DIALOG_DATA);

  title = model<string>('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form = this.formBuilder.group({});

  ngOnInit() {
    this.form.patchValue({});
  }
}
