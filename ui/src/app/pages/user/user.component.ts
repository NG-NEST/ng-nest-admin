import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { XQuery } from '@ng-nest/ui/core';
import { XTableColumn } from '@ng-nest/ui/table';
import { User, UserDescription, UserService } from '@ui/api';
import { BaseDescription, BasePagination } from '@ui/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [DatePipe]
})
export class UserComponent {
  columns: XTableColumn[] = [
    { id: 'name', label: UserDescription.Name, sort: true },
    { id: 'account', label: UserDescription.Account, sort: true },
    { id: 'email', label: UserDescription.Email, sort: true },
    { id: 'phone', label: UserDescription.Phone, sort: true },
    { id: 'createdAt', label: BaseDescription.CreatedAt, sort: true },
    { id: 'updatedAt', label: BaseDescription.UpdatedAt, sort: true }
  ];

  list: User[] = [];
  total = 0;
  loading = true;
  data = (index: number, size: number, query: XQuery) =>
    this.userService.users(this.paramsConvert(index, size, query)).pipe(map((x) => this.resultConvert(x)));

  constructor(private datePipe: DatePipe, private userService: UserService) {}

  paramsConvert(index: number, size: number, query: XQuery) {
    const { sort } = query;
    const orderBy = sort ? sort.map(({ field, value }) => ({ [`${field}`]: value })) : [];

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy
    };
  }

  resultConvert(body: BasePagination<User>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    return { list, total: count };
  }
}
