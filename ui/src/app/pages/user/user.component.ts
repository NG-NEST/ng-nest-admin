import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { RoleService, User, UserDescription, UserService, UserWhereInput } from '@ui/api';
import { BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, tap } from 'rxjs';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormBuilder } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [DatePipe]
})
export class UserComponent {
  searchForm = this.fb.group({
    name: [null]
  });

  columns: XTableColumn[] = [
    { id: 'index', type: 'index', left: 0, label: BaseDescription.Index, width: 70 },
    { id: 'name', label: UserDescription.Name },
    { id: 'account', label: UserDescription.Name },
    { id: 'email', label: UserDescription.Name },
    { id: 'phone', label: UserDescription.Name },

    { id: 'createdAt', label: BaseDescription.CreatedAt, width: 160 },
    { id: 'updatedAt', label: BaseDescription.UpdatedAt, width: 160 },
    { id: 'operate', label: BaseDescription.Operate, width: 160, right: 0 }
  ];

  total = 0;
  index = 1;
  size = 10;
  tableLoading = false;
  resetLoading = false;
  searchLoading = false;
  data: User[] = [];

  @ViewChild('tableCom') tableCom!: XTableComponent;

  constructor(
    private datePipe: DatePipe,
    private userService: UserService,
    private roleService: RoleService,
    private fb: FormBuilder,
    private dialog: XDialogService,
    private message: XMessageService,
    private messageBox: XMessageBoxService
  ) {}

  ngOnInit() {
    this.getTableData();
  }

  getTableData() {
    this.tableLoading = true;
    this.roleService.roleSelect().subscribe((x) => {
      console.log(x)
    });
    this.userService
      .users(this.setParams(this.index, this.size))
      .pipe(
        delay(300),
        tap((x) => {
          return this.resultConvert(x);
        }),
        tap(() => {
          this.tableLoading = false;
          this.resetLoading = false;
          this.searchLoading = false;
        })
      )
      .subscribe();
  }

  setParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: UserWhereInput = {};
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

  resultConvert(body: BasePagination<User>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    this.total = count!;
    this.data = list;
  }

  action(type: string, user?: User) {
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
        this.dialog.create(UserDetailComponent, {
          data: {
            saveSuccess: () => {
              this.searchForm.reset();
              this.index = 1;
              this.getTableData();
            }
          }
        });
        break;
      case 'edit':
        this.dialog.create(UserDetailComponent, {
          data: {
            id: user?.id,
            saveSuccess: () => {
              this.getTableData();
            }
          }
        });
        break;
      case 'delete':
        if (!user) return;
        this.messageBox.confirm({
          title: '删除用户',
          content: `确认删除此用户吗？ [${user.name}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.userService.deleteUser(user.id).subscribe((x) => {
              this.message.success(x);
              if (this.data.length === 1 && this.index > 1) {
                this.index--;
              }
              this.getTableData();
            });
          }
        });
    }
  }
}
