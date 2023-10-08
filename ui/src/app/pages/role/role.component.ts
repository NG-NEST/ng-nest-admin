import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { XIsEmpty, XQuery } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { Role, RoleDescription, RoleService, RoleWhereInput } from '@ui/api';
import { BaseDescription, BasePagination } from '@ui/core';
import { map } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  providers: [DatePipe]
})
export class RoleComponent {
  searchForm = this.fb.group({
    name: [null]
  });

  columns: XTableColumn[] = [
    { id: 'index', type: 'index', label: BaseDescription.Index, width: 70 },
    { id: 'name', label: RoleDescription.Name, sort: true },
    { id: 'description', label: RoleDescription.Description, sort: true },
    { id: 'createdAt', label: BaseDescription.CreatedAt, width: 160, sort: true },
    { id: 'updatedAt', label: BaseDescription.UpdatedAt, width: 160, sort: true }
  ];

  list: Role[] = [];
  total = 0;
  loading = true;
  data = (index: number, size: number, query: XQuery) =>
    this.roleService.roles(this.paramsConvert(index, size, query)).pipe(map((x) => this.resultConvert(x)));

  @ViewChild('tableCom') tableCom!: XTableComponent;

  constructor(private datePipe: DatePipe, private roleService: RoleService, private fb: FormBuilder) {}

  paramsConvert(index: number, size: number, query: XQuery) {
    const { sort } = query;
    const orderBy = sort ? sort.map(({ field, value }) => ({ [`${field}`]: value })) : [];
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

    return { list, total: count };
  }

  action(type: string) {
    switch (type) {
      case 'search':
        this.tableCom.change(1);
        break;
      case 'reset':
        this.searchForm.reset();
        this.action('search');
        break;
    }
  }
}
