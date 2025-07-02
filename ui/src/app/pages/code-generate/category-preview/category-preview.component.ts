import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XIconComponent, XTreeComponent, XTreeNode } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { X_DIALOG_DATA, XDialogModule, XDialogRef } from '@ng-nest/ui/dialog';
import { Catalogue, CatalogueService } from '@ui/api';
import { AppEditorComponent, AppFileIconPipe } from '@ui/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-category-preview',
  imports: [
    ReactiveFormsModule,
    XButtonComponent,
    XDialogModule,
    AppEditorComponent,
    XTreeComponent,
    XIconComponent,
    AppFileIconPipe
  ],
  templateUrl: './category-preview.component.html',
  styleUrl: './category-preview.component.scss'
})
export class CategoryPreviewComponent {
  dialogRef = inject(XDialogRef<CategoryPreviewComponent>);
  data = inject<{ resourceId: string; schemaDataIds?: string[] }>(X_DIALOG_DATA);
  formBuilder = inject(FormBuilder);
  catalogue = inject(CatalogueService);
  resourceId = signal('');
  filename = signal('');
  schemaDataIds = signal<string[] | undefined>(undefined);

  treeData = signal<XTreeNode[]>([]);

  form!: FormGroup;

  formLoading = signal(false);

  constructor() {
    const { resourceId, schemaDataIds } = this.data;
    this.resourceId.set(resourceId);
    if (schemaDataIds) {
      this.schemaDataIds.set(schemaDataIds);
    }

    this.form = this.formBuilder.group({
      content: ['']
    });
  }

  ngOnInit(): void {
    const params = this.schemaDataIds() ? { schemaDataIds: this.schemaDataIds() } : undefined;
    this.formLoading.set(true);
    this.catalogue
      .categoryPreview(this.resourceId(), params)
      .pipe(finalize(() => this.formLoading.set(false)))
      .subscribe((x) => {
        this.treeData.set(
          x.map((z: any) => {
            z.label = z.name;
            return z;
          })
        );
      });
  }

  onNodeClick(node: XTreeNode | Catalogue) {
    if (node.type !== 'File') {
      this.form.patchValue({ id: null, content: '' });
      return;
    }

    this.form.patchValue({ content: node.content });
    this.filename.set(node.name);
  }
}
