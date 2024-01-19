import { DatePipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent, XTableRow } from '@ng-nest/ui/table';
import {
  Resource,
  ResourceDescription,
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

@Component({
  selector: 'app-subject',
  standalone: true,
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
  columns: XTableColumn[] = [{ id: 'name', label: SubjectDescription.Name }];
  total = 0;
  index = 1;
  size = 20;
  tableLoading = false;
  resetLoading = false;
  searchLoading = false;
  data: Subject[] = [];
  selectedSubject = signal<Subject | null>(null);
  enabled = false;

  resourceSearchForm = this.fb.group({
    name: [null]
  });
  resourceColumns: XTableColumn[] = [
    { id: 'index', type: 'index', left: 0, label: BaseDescription.Index, width: 70 },

    { id: 'name', label: ResourceDescription.Name },
    { id: 'code', label: ResourceDescription.Code },
    { id: 'parentName', label: ResourceDescription.Parent },
    { id: 'subjectName', label: SubjectDescription.Name },
    { id: 'operate', label: BaseDescription.Operate, width: 160, right: 0 }
  ];
  resourceTotal = 0;
  resourceIndex = 1;
  resourceSize = 20;
  resourceTableLoading = false;
  resourceResetLoading = false;
  resourceSearchLoading = false;
  resourceData: Subject[] = [];

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
      this.enabled = this.selectedSubject() !== null;
    });
  }

  ngOnInit() {
    this.getTableData();
  }

  indexChange() {
    this.getTableData();
  }

  sizeChange() {
    this.index = 1;
    this.getTableData();
  }

  activatedRowChange(item: XTableRow) {
    this.selectedSubject.set(item as Subject);
    this.getResourceTableData();
  }

  getTableData() {
    this.tableLoading = true;
    this.subjectService
      .subjects(this.setParams(this.index, this.size))
      .pipe(
        delay(300),
        tap((x) => {
          return this.resultConvert(x);
        }),
        finalize(() => {
          this.tableLoading = false;
          this.resetLoading = false;
          this.searchLoading = false;
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

    this.total = count!;
    this.data = list;
  }

  setParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: SubjectWhereInput = {};
    const { name } = this.searchForm.value;
    this.index = index;
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
    this.resourceIndex = 1;
    this.getResourceTableData();
  }

  getResourceTableData() {
    this.resourceTableLoading = true;
    this.resourceService
      .resources(this.setResourceParams(this.resourceIndex, this.resourceSize))
      .pipe(
        delay(300),
        tap((x) => {
          return this.resourceResultConvert(x);
        }),
        finalize(() => {
          this.resourceTableLoading = false;
          this.resourceResetLoading = false;
          this.resourceSearchLoading = false;
        })
      )
      .subscribe();
  }

  setResourceParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: ResourceWhereInput = {
      subjectId: { equals: this.selectedSubject()!.id }
    };
    const { name } = this.resourceSearchForm.value;
    this.resourceIndex = index;
    if (!XIsEmpty(name)) where.name = { contains: name! };

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
    this.resourceTotal = count!;
    this.resourceData = list;
  }

  action(type: string, subject?: Subject) {
    switch (type) {
      case 'search':
        this.searchLoading = true;
        this.index = 1;
        this.getTableData();
        break;
      case 'reset':
        this.resetLoading = true;
        this.index = 1;
        this.searchForm.reset();
        this.getTableData();
        break;
      case 'add':
        this.dialog.create(SubjectDetailComponent, {
          data: {
            title: '新增',
            saveSuccess: () => {
              this.searchForm.reset();
              this.index = 1;
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
            this.subjectService.deleteSubject(subject.id).subscribe((x) => {
              this.message.success(x);
              if (this.data.length === 1 && this.index > 1) {
                this.index--;
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
        this.resourceSearchLoading = true;
        this.resourceIndex = 1;
        this.getResourceTableData();
        break;
      case 'reset':
        this.resetLoading = true;
        this.resourceIndex = 1;
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
              this.resourceIndex = 1;
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
            this.resourceService.deleteResource(resource.id).subscribe((x) => {
              this.message.success(x);
              if (this.resourceData.length === 1 && this.resourceIndex > 1) {
                this.resourceIndex--;
              }
              this.getResourceTableData();
            });
          }
        });
        break;
    }
  }
}
