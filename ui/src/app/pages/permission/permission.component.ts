import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import {
  Resource,
  ResourceDescription,
  ResourceOrderInput,
  ResourceService,
  ResourceWhereInput,
  SubjectDescription,
  SubjectService
} from '@ui/api';
import { BaseDescription, BasePagination } from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { XDialogService } from '@ng-nest/ui/dialog';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XSelectComponent
  ],
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  providers: [DatePipe]
})
export class PermissionComponent {
  resourceSearchForm = this.fb.group({
    subjectId: [''],
    name: [''],
    code: ['']
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

  subjects = signal<XSelectNode[]>([]);

  constructor(
    private datePipe: DatePipe,
    private subjectService: SubjectService,
    private resourceService: ResourceService,
    private fb: FormBuilder,
    // private dialog: XDialogService,
    private message: XMessageService,
    private messageBox: XMessageBoxService
  ) {}

  ngOnInit() {
    this.getSubjectSelect().subscribe();
    this.resourceSearchForm.controls.subjectId.valueChanges.subscribe(() => {
      this.getResourceTableData();
    });
  }

  getSubjectSelect() {
    return this.subjectService.subjectSelect({}).pipe(
      tap((x) => {
        this.subjects.set(x.map((y) => ({ label: y.name, id: y.id })));
        if (x.length > 0) {
          this.resourceSearchForm.controls.subjectId.setValue(x[0].id!);
        }
      })
    );
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
    const where: ResourceWhereInput = {};
    const { name, code, subjectId } = this.resourceSearchForm.getRawValue();
    if (!XIsEmpty(name)) where.name = { contains: name! };
    if (!XIsEmpty(code)) where.code = { contains: code! };
    if (!XIsEmpty(subjectId)) where.subjectId = { equals: subjectId! };

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
        this.resourceSearchForm.reset({ subjectId: this.resourceSearchForm.value.subjectId });
        this.getResourceTableData();
        break;
      case 'add':
        // this.dialog.create(ResourceDetailComponent, {
        //   data: {
        //     title: '新增',
        //     subjectId: this.selectedSubject()!.id,
        //     saveSuccess: () => {
        //       this.resourceSearchForm.reset();
        //       this.resourceIndex.set(1);
        //       this.getResourceTableData();
        //     }
        //   }
        // });
        break;
      case 'edit':
        // this.dialog.create(ResourceDetailComponent, {
        //   data: {
        //     id: resource?.id,
        //     subjectId: this.selectedSubject()!.id,
        //     title: '修改',
        //     saveSuccess: () => {
        //       this.getResourceTableData();
        //     }
        //   }
        // });
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
    }
  }
}
