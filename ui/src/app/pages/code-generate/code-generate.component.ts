import {
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import { XTreeSelectComponent, XTreeSelectNode } from '@ng-nest/ui/tree-select';
import { XTreeComponent, XTreeNode } from '@ng-nest/ui/tree';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  Catalogue,
  CatalogueFolderFiles,
  CatalogueMessage,
  CatalogueService,
  ResourceService,
  SchemaData,
  VariableService
} from '@ui/api';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import {
  Subject,
  finalize,
  fromEvent,
  of,
  takeUntil,
  tap,
  mergeMap,
  debounceTime,
  Observable,
  map,
  concatMap
} from 'rxjs';
import { XDialogService } from '@ng-nest/ui/dialog';
import { CatalogueComponent } from './catalogue/catalogue.component';
import {
  XDrawerService,
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
import { VariableSettingComponent } from './variable-setting/variable-setting.component';
import { CategoryPreviewComponent } from './category-preview/category-preview.component';
import { AppDownloadArrayBuffer } from 'src/app/core/functions/download';
import { DatePipe } from '@angular/common';
import { PreviewComponent } from './preview/preview.component';
import { filter } from 'lodash-es';
import { VariableGuideComponent } from './variable-guide/variable-guide.component';
import { SyntaxInfoComponent } from './syntax-info/syntax-info.component';

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
  animations: [],
  providers: [DatePipe]
})
export class CodeGenerateComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  resource = inject(ResourceService);
  catalogue = inject(CatalogueService);
  variable = inject(VariableService);
  messageBox = inject(XMessageBoxService);
  message = inject(XMessageService);
  dialog = inject(XDialogService);
  drawerService = inject(XDrawerService);
  datePipe = inject(DatePipe);
  document = inject(DOCUMENT);

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
    { id: 'variable-setting', label: '变量设置', icon: 'fto-settings' },
    { id: 'category-preview', label: '生成预览', icon: 'fto-eye' },
    { id: 'category-download', label: '代码下载', icon: 'fto-download' }
  ]);

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
          width: '55rem',
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
          width: '55rem',
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
          width: '55rem',
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
      case 'preview':
        this.getVariables()
          .pipe(
            concatMap(({ hasJsonshemaVariables, variables }) => {
              if (hasJsonshemaVariables) {
                this.dialog.create(VariableGuideComponent, {
                  width: '100%',
                  height: '100%',
                  data: {
                    title: '预览指引',
                    variables: variables,
                    many: data?.many,
                    saveSuccess: (schemaDatas: SchemaData[]) => {
                      this.dialog.create(PreviewComponent, {
                        width: '100%',
                        height: '100%',
                        data: { id: data!.id, schemaDataIds: schemaDatas.map((x) => x.id) }
                      });
                    }
                  }
                });
              } else {
                this.dialog.create(PreviewComponent, {
                  width: '100%',
                  height: '100%',
                  data: { id: data!.id }
                });
              }
              return of(true);
            })
          )
          .subscribe();
        break;
      case 'download':
        this.getVariables()
          .pipe(
            concatMap(({ hasJsonshemaVariables, variables }) => {
              if (hasJsonshemaVariables) {
                this.dialog.create(VariableGuideComponent, {
                  width: '100%',
                  height: '100%',
                  data: {
                    title: '下载指引',
                    variables: variables,
                    many: data?.many,
                    saveSuccess: (schemaDatas: SchemaData[]) => {
                      this.catalogue
                        .download(data!.id, { schemaDataIds: schemaDatas.map((x) => x.id) })
                        .subscribe((x) => {
                          AppDownloadArrayBuffer(x, this.document, !data?.many);
                        });
                    }
                  }
                });
              } else {
                this.catalogue.download(data!.id).subscribe((x) => {
                  AppDownloadArrayBuffer(x, this.document);
                });
              }

              return of(true);
            })
          )
          .subscribe();

        break;
      case 'folder-upload':
        this.folderInput().nativeElement.click();
        break;
      case 'toggle':
        !this.treeCom().nodeOpen() && this.treeCom().onToggle(event, data as XTreeNode);
        break;
      case 'category-preview':
        this.getVariables()
          .pipe(
            concatMap(({ hasJsonshemaVariables, variables }) => {
              if (hasJsonshemaVariables) {
                this.dialog.create(VariableGuideComponent, {
                  width: '100%',
                  height: '100%',
                  data: {
                    title: '预览指引',
                    variables: variables,
                    many: true,
                    saveSuccess: (schemaDatas: SchemaData[]) => {
                      this.dialog.create(CategoryPreviewComponent, {
                        width: '100%',
                        height: '100%',
                        data: {
                          resourceId: this.form.value.category,
                          schemaDataIds: schemaDatas.map((x) => x.id)
                        }
                      });
                    }
                  }
                });
              } else {
                this.dialog.create(CategoryPreviewComponent, {
                  width: '100%',
                  height: '100%',
                  data: {
                    resourceId: this.form.value.category
                  }
                });
              }
              return of(true);
            })
          )
          .subscribe();

        break;
      case 'category-download':
        this.getVariables()
          .pipe(
            concatMap(({ hasJsonshemaVariables, variables }) => {
              if (hasJsonshemaVariables) {
                this.dialog.create(VariableGuideComponent, {
                  width: '100%',
                  height: '100%',
                  data: {
                    title: '下载指引',
                    variables: variables,
                    many: true,
                    saveSuccess: (schemaDatas: SchemaData[]) => {
                      this.catalogue
                        .categoryDownload(this.form.value.category!, {
                          schemaDataIds: schemaDatas.map((x) => x.id)
                        })
                        .subscribe((x) => {
                          AppDownloadArrayBuffer(x, this.document, false);
                        });
                    }
                  }
                });
              } else {
                this.catalogue.categoryDownload(this.form.value.category!).subscribe((x) => {
                  AppDownloadArrayBuffer(x, this.document, false);
                });
              }

              return of(true);
            })
          )
          .subscribe();

        break;
      case 'variable-setting':
        this.dialog.create(VariableSettingComponent, {
          width: '100%',
          height: '100%',
          data: {
            resourceId: this.form.value.category
          }
        });
        break;
    }
  }

  getCategoryName(category: string) {
    const one = this.categories().find((x) => x.id === category);
    if (one) return one.label;
    return '';
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
      .pipe(finalize(() => this.saveContentLoading.set(false)))
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
        tap((x) => {
          this.categories.set(
            x.map((y: any) => {
              y.label = y.name;
              return y;
            })
          );
          if (this.categories().length > 0) {
            this.form.patchValue({ category: this.categories()[0].id });
          }
        })
      );
  }

  getVariables() {
    return this.variable
      .variableSelect({
        where: { resourceId: { equals: this.form.value.category! } }
      })
      .pipe(
        map((x) => {
          const jsonshemaVariables = filter(x, (item) => item.type === 'json-schema' && item.value);
          return { hasJsonshemaVariables: jsonshemaVariables.length > 0, variables: x };
        })
      );
  }

  openTemplateDoc() {
    this.drawerService.create(SyntaxInfoComponent, {
      className: 'app-drawer',
      size: '50%',
      data: {}
    });
  }
}
