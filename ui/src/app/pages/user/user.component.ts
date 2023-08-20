import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XTableColumn } from '@ng-nest/ui/table';
import { User, UserDescription } from '@ui/api';
import { BaseDescription, BasePagination } from '@ui/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  providers: [DatePipe]
})
export class UserComponent implements OnInit {
  columns: XTableColumn[] = [
    { id: 'name', label: UserDescription.Name },
    { id: 'account', label: UserDescription.Account },
    { id: 'email', label: UserDescription.Email },
    { id: 'phone', label: UserDescription.Phone },
    { id: 'createdAt', label: BaseDescription.CreatedAt },
    { id: 'updatedAt', label: BaseDescription.UpdatedAt }
  ];

  list: User[] = [];
  count = 0;
  loading = true;

  constructor(private activatedRoute: ActivatedRoute, private date: DatePipe) {}
  ngOnInit(): void {
    this.activatedRoute.data.pipe(map(({ users }) => (users as BasePagination<User>) || {})).subscribe(({ data, count }) => {
      this.list = (data ?? []).map((x) => {
        x = { ...x };
        x.createdAt = this.date.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
        x.updatedAt = this.date.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
        return x;
      });
      this.count = count ?? 0;
    });
  }
}
