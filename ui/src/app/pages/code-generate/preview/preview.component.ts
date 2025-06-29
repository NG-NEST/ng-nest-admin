import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { X_DIALOG_DATA, XDialogModule, XDialogRef } from '@ng-nest/ui/dialog';
import { CatalogueService } from '@ui/api';
import { AppEditorComponent } from '@ui/core';

@Component({
  selector: 'app-preview',
  imports: [ReactiveFormsModule, XButtonComponent, XDialogModule, AppEditorComponent],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  dialogRef = inject(XDialogRef<PreviewComponent>);
  data = inject<{ id: string }>(X_DIALOG_DATA);
  formBuilder = inject(FormBuilder);
  catalogue = inject(CatalogueService);
  id = signal('');
  filename = signal('');

  form!: FormGroup;

  constructor() {
    const { id } = this.data;
    this.id.set(id);

    this.form = this.formBuilder.group({
      content: ['']
    });
  }

  ngOnInit(): void {
    this.catalogue.preview(this.id()).subscribe(({ name, content }) => {
      this.filename.set(name);
      this.form.patchValue({ content });
    });
  }
}
