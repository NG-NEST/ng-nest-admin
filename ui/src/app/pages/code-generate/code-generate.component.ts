import { Component, ElementRef, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Catalogue,
  CatalogueFolderFiles,
  CatalogueMessage,
  CatalogueService,
  ResourceService
} from '@ui/api';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import {
  Subject,
  delay,
  finalize,
  fromEvent,
  of,
  takeUntil,
  tap,
  mergeMap,
  debounceTime,
  Observable
} from 'rxjs';
import { XDialogService } from '@ng-nest/ui/dialog';
import { CatalogueComponent } from './catalogue/catalogue.component';
import {
  XDropdownComponent,
  XDropdownNode,
  XEmptyComponent,
  XIconComponent,
  XLinkComponent,
  XMessageBoxAction,
  XMessageBoxService,
  XMessageService,
  XTooltipDirective
} from '@ng-nest/ui';
import { AppEditorComponent, AppFileIconPipe, AppFileReader, AppParseGitignore } from '@ui/core';

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
    XTooltipDirective,
    XEmptyComponent,
    XDropdownComponent,
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
  filename = signal('');
  folderInput = viewChild.required<ElementRef<HTMLInputElement>>('folderInput');

  $destroy = new Subject<void>();

  dropdownMenu = signal<XDropdownNode[]>([
    { id: 'add-root', label: '添加根节点', icon: 'fto-plus' },
    { id: 'folder-upload', label: '文件夹上传', icon: 'fto-upload' },
    { id: 'set-env', label: '变量设置', icon: 'fto-settings' },
    { id: 'category-preview', label: '生成预览', icon: 'fto-eye' },
    { id: 'code-download', label: '代码下载', icon: 'fto-download' }
  ]);

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
    this.form.controls.category.valueChanges.pipe(takeUntil(this.$destroy)).subscribe((x) => {
      this.getCatalogues(x!).subscribe();
    });

    fromEvent(this.folderInput().nativeElement, 'change')
      .pipe(takeUntil(this.$destroy))
      .subscribe((event: any) => {
        const files = event.target.files;
        this.uploadFolder(files).subscribe();
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  action(event: Event | null, type: string, data?: Catalogue & XTreeNode) {
    event?.stopPropagation();
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
      case 'content':
        this.catalogue.content(data!.id).subscribe((x) => {
          console.log(x);
        });
        break;
      case 'folder-upload':
        this.folderInput().nativeElement.click();
        break;
      case 'toggle':
        !this.treeCom().nodeOpen() && this.treeCom().onToggle(event, data as XTreeNode);
        break;
      case 'category-preview':
        this.catalogue.categoryPreview(this.form.value.category!).subscribe((x) => {
          console.log(x);
        });
        break;
    }
  }

  onDropdownClick(event: XDropdownNode) {
    this.action(null, event.id);
  }

  nodeOpen(open$: Observable<boolean>) {
    return open$.pipe(debounceTime(100));
  }

  uploadFolder(fileList: FileList) {
    const files = Array.from(fileList);
    const strippedFiles = this.stripRootPath(files);
    const fileMap = new Map(strippedFiles.map((f) => [f.path, f.file]));
    const gitignoreFile = fileMap.get('.gitignore');

    if (gitignoreFile) {
      return AppFileReader(gitignoreFile).pipe(
        mergeMap((text) => {
          const gitignoreText = text;
          const ignored = AppParseGitignore(gitignoreText, Array.from(fileMap.keys()));
          const filesToUpload = strippedFiles.filter((f) => !ignored.has(f.path));
          return this.uploadFiles(filesToUpload.map(({ file }) => file));
        })
      );
    } else {
      return this.uploadFiles(files);
    }
  }

  stripRootPath(files: File[]) {
    if (files.length === 0) return [];

    const firstPath = files[0].webkitRelativePath;
    const rootFolder = firstPath.split('/')[0];

    return files.map((file) => {
      const relativePath = file.webkitRelativePath;
      const strippedPath = relativePath.startsWith(rootFolder + '/')
        ? relativePath.slice(rootFolder.length + 1)
        : relativePath;

      return {
        file,
        path: strippedPath
      };
    });
  }

  uploadFiles(files: File[]) {
    if (files.length === 0) {
      this.message.warning(CatalogueMessage.NotFoundFiles);
      return of('');
    }

    const formData = new FormData();
    const category = this.form.getRawValue().category!;
    formData.append('filepath', CatalogueFolderFiles);
    formData.append('resourceId', category);
    files.forEach((file) => {
      formData.append(`files`, file, encodeURIComponent(file.webkitRelativePath));
    });

    return this.catalogue.folderUpload(formData).pipe(
      tap((x) => {
        this.getCatalogues(category).subscribe();
        this.message.success(x);
      })
    );
  }

  onNodeClick(node: XTreeNode | Catalogue) {
    if (node.type !== 'File') {
      this.editorForm.patchValue({ id: null, content: '' });
      return;
    }

    this.catalogue.catalogueContent(node.id).subscribe((x) => {
      this.editorForm.patchValue({ id: node.id, content: x });
      this.filename.set(node.name);
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
        where: { subject: { code: { equals: 'code' } } },
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
