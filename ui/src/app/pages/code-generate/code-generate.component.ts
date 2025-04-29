import { Component, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Catalogue, CatalogueMessage, CatalogueService, ResourceService } from '@ui/api';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { delay, finalize, tap } from 'rxjs';
import { XDialogService } from '@ng-nest/ui/dialog';
import { CatalogueComponent } from './catalogue/catalogue.component';
import {
  XIconComponent,
  XLinkComponent,
  XMessageBoxAction,
  XMessageBoxService,
  XMessageService
} from '@ng-nest/ui';
import { AppEditorComponent, AppFileIconPipe } from '@ui/core';

@Component({
  selector: 'app-code-generate',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XTreeComponent,
    XTreeSelectComponent,
    XButtonComponent,
    XLoadingComponent,
    XIconComponent,
    XLinkComponent,
    AppEditorComponent,
    AppFileIconPipe
  ],
  templateUrl: './code-generate.component.html',
  styleUrls: ['./code-generate.component.scss'],
  animations: []
})
export class CodeGenerateComponent implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    category: ['']
  });
  editorForm = this.formBuilder.group({
    id: [''],
    content: ['']
  });
  categories = signal<XTreeSelectNode[]>([]);
  treeLoading = signal(false);
  treeData = signal<XTreeNode[]>([]);
  saveContentLoading = signal(false);
  treeCom = viewChild.required<XTreeComponent>('treeCom');
  value = signal('');

  constructor(
    private formBuilder: FormBuilder,
    private resource: ResourceService,
    private catalogue: CatalogueService,
    private messageBox: XMessageBoxService,
    private message: XMessageService,
    private dialog: XDialogService
  ) {}

  ngOnInit(): void {
    this.getCategories().subscribe();
    this.form.controls.category.valueChanges.subscribe((x) => {
      this.getCatalogues(x!).subscribe();
    });
  }

  ngOnDestroy(): void {}

  action(event: Event, type: string, data?: Catalogue & XTreeNode) {
    event.stopPropagation();
    switch (type) {
      case 'add-root':
        this.dialog.create(CatalogueComponent, {
          width: '30rem',
          data: {
            resourceId: this.form.value.category,
            type: type,
            saveSuccess: (value: Catalogue & XTreeNode) => {
              value.label = value.name;
              this.treeCom().addNode(value);
            }
          }
        });
        break;
      case 'add-child':
        this.dialog.create(CatalogueComponent, {
          width: '30rem',
          data: {
            resourceId: this.form.value.category,
            pid: data?.id,
            type: type,
            saveSuccess: (value: Catalogue & XTreeNode) => {
              value.label = value.name;
              this.treeCom().addNode(value);
            }
          }
        });
        break;
      case 'edit':
        this.dialog.create(CatalogueComponent, {
          width: '30rem',
          data: {
            id: data?.id,
            resourceId: this.form.value.category,
            type: type,
            saveSuccess: (value: Catalogue & XTreeNode) => {
              value.label = value.name;
              this.treeCom().updateNode(data!, value);
            }
          }
        });
        break;
      case 'delete':
        this.messageBox.confirm({
          title: '删除角色',
          content: `确认删除此节点吗？ [${data!.name}]`,
          type: 'warning',
          callback: (msg: XMessageBoxAction) => {
            if (msg !== 'confirm') return;
            this.catalogue.delete(data!.id).subscribe((x) => {
              this.message.success(x);
              this.treeCom().removeNode(data!);
            });
          }
        });

        break;
    }
  }

  onNodeClick(node: XTreeNode) {
    this.catalogue.catalogueContent(node.id).subscribe((x) => {
      this.editorForm.patchValue({ id: node.id, content: x });
    });
  }

  saveContent() {
    const value = this.editorForm.getRawValue();
    if (!value.id) return;
    this.saveContentLoading.set(true);
    this.catalogue
      .update({ id: value.id!, content: value.content! })
      .pipe(
        delay(2000),
        finalize(() => this.saveContentLoading.set(false))
      )
      .subscribe(() => {
        this.message.success(CatalogueMessage.UpdatedSuccess);
      });
  }

  getCatalogues(resourceId: string) {
    this.treeLoading.set(true);
    return this.catalogue
      .catalogueSelect({
        where: { resourceId: { equals: resourceId! } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((y) =>
          this.treeData.set(
            y.map((z: any) => {
              z.label = z.name;
              return z;
            })
          )
        ),
        finalize(() => this.treeLoading.set(false))
      );
  }

  getCategories() {
    return this.resource
      .resourceSelect({
        where: { subject: { code: { equals: 'code-category' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) =>
          this.categories.set(
            x.map((y: any) => {
              y.label = y.name;
              return y;
            })
          )
        )
      );
  }
}
