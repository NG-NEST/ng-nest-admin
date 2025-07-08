import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XLoadingComponent } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { X_DIALOG_DATA, XDialogModule, XDialogRef } from '@ng-nest/ui/dialog';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { Catalogue, CatalogueService } from '@ui/api';
import { AppEditorComponent, AppFileIconPipe } from '@ui/core';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-preview',
  imports: [
    ReactiveFormsModule,
    XButtonComponent,
    XDialogModule,
    AppEditorComponent,
    XTreeComponent,
    XIconComponent,
    XLoadingComponent,
    AppFileIconPipe
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent {
  dialogRef = inject(XDialogRef<PreviewComponent>);
  data = inject<{ id: string; schemaDataIds?: string[] }>(X_DIALOG_DATA);
  formBuilder = inject(FormBuilder);
  catalogue = inject(CatalogueService);
  id = signal('');
  filename = signal('');
  schemaDataIds = signal<string[] | undefined>(undefined);
  isArray = signal(false);
  showTree = signal(true);

  formLoading = signal(false);
  form!: FormGroup;
  treeData = signal<XTreeNode[]>([]);

  constructor() {
    const { id, schemaDataIds } = this.data;
    this.id.set(id);
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
      .preview(this.id(), params)
      .pipe(finalize(() => this.formLoading.set(false)))
      .subscribe((data) => {
        this.isArray.set(Array.isArray(data));
        if (this.isArray()) {
          this.treeData.set(
            (data as Catalogue[]).map((z: any) => {
              z.label = z.name;
              return z;
            })
          );
        } else {
          this.showTree.set(false);
          const { name, content } = data as Catalogue;
          this.filename.set(name);
          this.form.patchValue({ content });
        }
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
