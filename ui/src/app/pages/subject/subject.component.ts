import { DatePipe } from '@angular/common';
import { Component, signal, computed, effect } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import {
  Resource,
  ResourceDescription,
  ResourceOrderInput,
  ResourceService,
  ResourceWhereInput,
  Subject,
  SubjectDescription,
  SubjectService,
  SubjectWhereInput
} from '@ui/api';
import { BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { ResourceDetailComponent } from './resource-detail/resource-detail.component';
import { PermissionListComponent } from './permission-list/permission-list.component';

@Component({
  selector: 'app-subject',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent
  ],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss'],
  providers: [DatePipe]
})
export class SubjectComponent {
  searchForm = this.fb.group({
    name: [null]
  });
  columns = signal<XTableColumn[]>([{ id: 'name', label: SubjectDescription.Name }]);
  total = signal(0);
  index = signal(1);
  size = signal(20);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  data = signal<Subject[]>([]);
  selectedSubject = signal<Subject | null>(null);
  enabled = computed(() => {
    return this.selectedSubject() !== null;
  });

  resourceSearchForm = this.fb.group({
    name: [null],
    code: [null]
  });
  resourceColumns = signal<XTableColumn[]>([
    { id: 'index', type: 'index', left: 0, label: BaseDescription.Index, width: 70 },
    { id: 'name', label: ResourceDescription.Name },
    { id: 'code', label: ResourceDescription.Code },
    { id: 'sort', label: ResourceDescription.Sort },
    { id: 'parentName', label: ResourceDescription.Parent },
    { id: 'subjectName', label: SubjectDescription.Name },
    { id: 'operate', label: BaseDescription.Operate, width: 160, right: 0 }
  ]);
  resourceTotal = signal(0);
  resourceIndex = signal(1);
  resourceSize = signal(20);
  resourceTableLoading = signal(false);
  resourceResetLoading = signal(false);
  resourceSearchLoading = signal(false);
  resourceData = signal<Resource[]>([]);

  constructor(
    private datePipe: DatePipe,
    private subjectService: SubjectService,
    private resourceService: ResourceService,
    private fb: FormBuilder,
    private dialog: XDialogService,
    private message: XMessageService,
    private messageBox: XMessageBoxService
  ) {
    effect(() => {
      if (this.enabled()) {
        this.resourceSearchForm.enable();
      } else {
        this.resourceSearchForm.disable();
      }
    });
  }

  ngOnInit() {
    this.getTableData();
  }

  indexChange() {
    this.getTableData();
  }

  sizeChange() {
    this.index.set(1);
    this.getTableData();
  }

  activatedRowChange(item?: XTableRow) {
    if (!item) return;
    this.selectedSubject.set(item as Subject);
    this.getResourceTableData();
  }

  getTableData() {
    this.tableLoading.set(true);
    this.subjectService
      .subjects(this.setParams(this.index(), this.size()))
      .pipe(
        delay(300),
        tap((x) => {
          return this.resultConvert(x);
        }),
        finalize(() => {
          this.tableLoading.set(false);
          this.resetLoading.set(false);
          this.searchLoading.set(false);
        })
      )
      .subscribe();
  }

  resultConvert(body: BasePagination<Subject>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  setParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: SubjectWhereInput = {};
    const { name } = this.searchForm.value;
    if (!XIsEmpty(name)) where.name = { contains: name! };

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy,
      where
    };
  }

  resourceIndexChange() {
    this.getResourceTableData();
  }

  resourceSizeChange() {
    this.resourceIndex.set(1);
    this.getResourceTableData();
  }

  getResourceTableData() {
    this.resourceTableLoading.set(true);
    this.resourceService
      .resources(this.setResourceParams(this.resourceIndex(), this.resourceSize()))
      .pipe(
        delay(300),
        tap((x) => {
          return this.resourceResultConvert(x);
        }),
        finalize(() => {
          this.resourceTableLoading.set(false);
          this.resourceResetLoading.set(false);
          this.resourceSearchLoading.set(false);
        })
      )
      .subscribe();
  }

  setResourceParams(index: number, size: number) {
    const orderBy: ResourceOrderInput[] = [{ sort: 'asc' }];
    const where: ResourceWhereInput = {
      subjectId: { equals: this.selectedSubject()!.id }
    };
    const { name, code } = this.resourceSearchForm.getRawValue();
    if (!XIsEmpty(name)) where.name = { contains: name! };
    if (!XIsEmpty(code)) where.code = { contains: code! };

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy,
      where
    };
  }

  resourceResultConvert(body: BasePagination<Resource>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.subjectName = x.subject.name;
      x.parentName = x.parent?.name;
      return x;
    });
    this.resourceTotal.set(count!);
    this.resourceData.set(list);
  }

  action(type: string, subject?: Subject) {
    switch (type) {
      case 'search':
        this.searchLoading.set(true);
        this.index.set(1);
        this.getTableData();
        break;
      case 'reset':
        this.resetLoading.set(true);
        this.index.set(1);
        this.searchForm.reset();
        this.getTableData();
        break;
      case 'add':
        this.dialog.create(SubjectDetailComponent, {
          data: {
            title: '新增',
            saveSuccess: () => {
              this.searchForm.reset();
              this.index.set(1);
              this.getTableData();
            }
          }
        });
        break;
      case 'edit':
        this.dialog.create(SubjectDetailComponent, {
          data: {
            id: subject?.id,
            title: '修改',
            saveSuccess: () => {
              this.getTableData();
            }
          }
        });
        break;
      case 'delete':
        if (!subject) return;
        this.messageBox.confirm({
          title: '删除主体',
          content: `确认删除此主体吗？ [${subject.name}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.subjectService.delete(subject.id).subscribe((x) => {
              this.message.success(x);
              if (this.data().length === 1 && this.index() > 1) {
                this.index.update((x) => --x);
              }
              this.getTableData();
            });
          }
        });
        break;
    }
  }

  resourceAction(type: string, resource?: Resource) {
    switch (type) {
      case 'search':
        this.resourceSearchLoading.set(true);
        this.resourceIndex.set(1);
        this.getResourceTableData();
        break;
      case 'reset':
        this.resourceResetLoading.set(true);
        this.resourceIndex.set(1);
        this.resourceSearchForm.reset();
        this.getResourceTableData();
        break;
      case 'add':
        this.dialog.create(ResourceDetailComponent, {
          data: {
            title: '新增',
            subjectId: this.selectedSubject()!.id,
            saveSuccess: () => {
              this.resourceSearchForm.reset();
              this.resourceIndex.set(1);
              this.getResourceTableData();
            }
          }
        });
        break;
      case 'edit':
        this.dialog.create(ResourceDetailComponent, {
          data: {
            id: resource?.id,
            subjectId: this.selectedSubject()!.id,
            title: '修改',
            saveSuccess: () => {
              this.getResourceTableData();
            }
          }
        });
        break;
      case 'delete':
        if (!resource) return;
        this.messageBox.confirm({
          title: '删除资源',
          content: `确认删除此资源吗？ [${resource.name}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.resourceService.delete(resource.id).subscribe((x) => {
              this.message.success(x);
              if (this.resourceData().length === 1 && this.resourceIndex() > 1) {
                this.resourceIndex.update((x) => --x);
              }
              this.getResourceTableData();
            });
          }
        });
        break;
      case 'permission':
        if (!resource) return;
        this.dialog.create(PermissionListComponent, {
          width: '800px',
          backdropClose: false,
          data: {
            id: resource.id,
            title: resource.name,
            saveSuccess: () => {
              this.getResourceTableData();
            }
          }
        });
        break;
    }
  }
}
