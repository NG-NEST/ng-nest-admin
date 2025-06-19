import { DatePipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { Role, RoleDescription, RoleService, RoleWhereInput } from '@ui/api';
import { AppAuthDirective, BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { RolePermissionComponent } from './role-permission/role-permission.component';

@Component({
  selector: 'app-role',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    AppAuthDirective
  ],
  templateUrl: './role.component.html',
  providers: [DatePipe]
})
export class RoleComponent {
  datePipe = inject(DatePipe);
  roleService = inject(RoleService);
  fb = inject(FormBuilder);
  dialog = inject(XDialogService);
  message = inject(XMessageService);
  messageBox = inject(XMessageBoxService);

  searchForm = this.fb.group({
    name: [null]
  });

  columns = signal<XTableColumn[]>([
    { id: 'index', type: 'index', left: 0, label: BaseDescription.Index, width: 70 },
    { id: 'name', label: RoleDescription.Name },
    { id: 'description', label: RoleDescription.Description },
    { id: 'createdAt', label: BaseDescription.CreatedAt, width: 180 },
    { id: 'updatedAt', label: BaseDescription.UpdatedAt, width: 180 },
    { id: 'operate', label: BaseDescription.Operate, width: 160, right: 0 }
  ]);

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  data = signal<Role[]>([]);

  tableCom = viewChild.required<XTableComponent>('tableCom');

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

  getTableData() {
    this.tableLoading.set(true);
    this.roleService
      .roles(this.setParams(this.index(), this.size()))
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

  setParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: RoleWhereInput = {};
    const { name } = this.searchForm.value;
    if (!XIsEmpty(name)) where.name = { contains: name! };

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy,
      where
    };
  }

  resultConvert(body: BasePagination<Role>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  action(type: string, role?: Role) {
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
        this.dialog.create(RoleDetailComponent, {
          data: {
            saveSuccess: () => {
              this.searchForm.reset();
              this.index.set(1);
              this.getTableData();
            }
          }
        });
        break;
      case 'edit':
        this.dialog.create(RoleDetailComponent, {
          data: {
            id: role?.id,
            saveSuccess: () => {
              this.getTableData();
            }
          }
        });
        break;
      case 'delete':
        if (!role) return;
        this.messageBox.confirm({
          title: '删除角色',
          content: `确认删除此角色吗？ [${role.name}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.roleService.delete(role.id).subscribe((x) => {
              this.message.success(x);
              if (this.data().length === 1 && this.index() > 1) {
                this.index.update((x) => --x);
              }
              this.getTableData();
            });
          }
        });
        break;
      case 'auth':
        this.dialog.create(RolePermissionComponent, {
          width: '800px',
          data: {
            id: role?.id,
            saveSuccess: () => {
              // this.getTableData();
            }
          }
        });
        break;
    }
  }
}
