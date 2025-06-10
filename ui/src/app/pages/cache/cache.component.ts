import { DatePipe } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
// import { XMessageBoxService } from '@ng-nest/ui/message-box';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { Cache, CacheDescription, CacheGroup, CacheService } from '@ui/api';
import {
  AppAuthDirective,
  AppBase64ToStringPipe,
  BaseDescription,
  BaseOrder,
  BasePagination
} from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
// import { CacheDetailComponent } from './cache-detail/cache-detail.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { XDialogService } from '@ng-nest/ui/dialog';
// import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XTagComponent } from '@ng-nest/ui/tag';

@Component({
  selector: 'app-cache',
  imports: [
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XTagComponent,
    AppAuthDirective,
    AppBase64ToStringPipe
  ],
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss'],
  providers: [DatePipe]
})
export class CacheComponent {
  searchForm = this.fb.group({
    name: [null]
  });

  columns = signal<XTableColumn[]>([
    { id: 'index', type: 'index', label: BaseDescription.Index, width: 70 },
    { id: 'type', label: CacheDescription.Type, width: 120 },
    { id: 'keys', label: CacheDescription.Keys }
  ]);

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  clearAllLoading = signal(false);
  data = signal<CacheGroup[]>([]);

  @ViewChild('tableCom') tableCom!: XTableComponent;

  constructor(
    private cacheService: CacheService,
    private fb: FormBuilder
    // private dialog: XDialogService
  ) {}

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
    this.cacheService
      .cacheKeys()
      .pipe(
        delay(300),
        tap((x) => {
          this.total.set(x.length);
          this.data.set(x);
          // this.resultConvert(x);
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
    // const where: CacheWhereInput = {};
    // const { name } = this.searchForm.value;
    // if (!XIsEmpty(name)) where.name = { contains: name! };
    return {
      skip: (index - 1) * size,
      take: size,
      orderBy
      // where
    };
  }

  resultConvert(body: BasePagination<CacheGroup>) {
    const { data, count } = body;
    const list = data.map((x) => {
      // x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      // x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  action(type: string, cache?: Cache) {
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
      case 'clear-all':
        this.clearAllLoading.set(true);
        this.cacheService
          .deleteAll()
          .pipe(finalize(() => this.clearAllLoading.set(false)))
          .subscribe(() => {
            this.searchForm.reset();
            this.index.set(1);
            this.getTableData();
          });

        break;
      case 'edit':
        // this.dialog.create(CacheDetailComponent, {
        //   data: {
        //     id: cache?.id,
        //     saveSuccess: () => {
        //       this.getTableData();
        //     }
        //   }
        // });
        break;
      case 'delete':
        if (!cache) return;
        // this.messageBox.confirm({
        //   title: '删除用户',
        //   content: `确认删除此用户吗？ [${cache.name}]`,
        //   type: 'warning',
        //   callback: (data: XMessageBoxAction) => {
        //     if (data !== 'confirm') return;
        //     this.cacheService.delete(cache.id).subscribe((x) => {
        //       this.message.success(x);
        //       if (this.data().length === 1 && this.index() > 1) {
        //         this.index.update((x) => --x);
        //       }
        //       this.getTableData();
        //     });
        //   }
        // });
        break;
    }
  }
}
