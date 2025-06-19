import { DatePipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { RoleDescription, User, UserDescription, UserService, UserWhereInput } from '@ui/api';
import { AppAuthDirective, BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTagComponent } from '@ng-nest/ui/tag';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-user',
  imports: [
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XTagComponent,
    AppAuthDirective
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [DatePipe]
})
export class UserComponent {
  datePipe = inject(DatePipe);
  userService = inject(UserService);
  fb = inject(FormBuilder);
  dialog = inject(XDialogService);
  message = inject(XMessageService);
  messageBox = inject(XMessageBoxService);

  searchForm = this.fb.group({
    name: [null]
  });

  columns = signal<XTableColumn[]>([
    { id: 'index', type: 'index', label: BaseDescription.Index, width: 70, left: 0 },
    { id: 'name', label: UserDescription.Name, width: 120, left: 70 },
    { id: 'account', label: UserDescription.Account, width: 120, left: 190 },
    { id: 'roles', label: RoleDescription.Role },
    { id: 'email', label: UserDescription.Email },
    { id: 'phone', label: UserDescription.Phone, width: 160 },
    { id: 'operate', label: BaseDescription.Operate, width: 200, right: 0 }
  ]);

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  data = signal<User[]>([]);

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
    this.userService
      .users(this.setParams(this.index(), this.size()))
      .pipe(
        delay(300),
        tap((x) => {
          this.resultConvert(x);
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
    const where: UserWhereInput = {};
    const { name } = this.searchForm.value;
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

    this.total.set(count!);
    this.data.set(list);
  }

  action(type: string, user?: User) {
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
        this.dialog.create(UserDetailComponent, {
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
            this.userService.delete(user.id).subscribe((x) => {
              this.message.success(x);
              if (this.data().length === 1 && this.index() > 1) {
                this.index.update((x) => --x);
              }
              this.getTableData();
            });
          }
        });
        break;
      case 'reset-password':
        this.dialog.create(ResetPasswordComponent, {
          data: {
            id: user?.id
          }
        });
        break;
    }
  }
}
