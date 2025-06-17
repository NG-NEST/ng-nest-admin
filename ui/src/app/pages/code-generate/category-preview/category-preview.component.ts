import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { X_DIALOG_DATA, XDialogRef } from '@ng-nest/ui/dialog';

@Component({
  selector: 'app-category-preview',
  imports: [ReactiveFormsModule],
  templateUrl: './category-preview.component.html',
  styleUrl: './category-preview.component.scss'
})
export class CategoryPreviewComponent {
  dialogRef = inject(XDialogRef<CategoryPreviewComponent>);
  data = inject<{ resourceId: string }>(X_DIALOG_DATA);
  resourceId = signal('');

  constructor() {
    const { resourceId } = this.data;
    this.resourceId.set(resourceId);
  }
}
