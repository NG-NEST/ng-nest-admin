import { DatePipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { CacheDescription, CacheGroup, CacheService, ResourceCode, ResourceService } from '@ui/api';
import { AppAuthDirective, BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import {
  XDialogService,
  XI18nPipe,
  XI18nService,
  XMessageBoxAction,
  XMessageBoxService,
  XMessageService
} from '@ng-nest/ui';
import { CacheGroupComponent } from './cache-group/cache-group.component';

@Component({
  selector: 'app-cache',
  imports: [
    ReactiveFormsModule,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XI18nPipe,
    AppAuthDirective
  ],
  templateUrl: './cache.component.html',
  styleUrls: ['./cache.component.scss'],
  providers: [DatePipe]
})
export class CacheComponent {
  private cacheService = inject(CacheService);
  private fb = inject(FormBuilder);
  private resource = inject(ResourceService);
  private messageBox = inject(XMessageBoxService);
  private message = inject(XMessageService);
  private dialog = inject(XDialogService);
  private i18n = inject(XI18nService);
  searchForm = this.fb.group({
    name: [null]
  });

  columns = signal<XTableColumn[]>([
    { id: 'index', type: 'index', label: this.i18n.L(`$base.${BaseDescription.Index}`), width: 70 },
    { id: 'type', label: this.i18n.L(`$cache.${CacheDescription.Type}`), flex: 1 },
    { id: 'keys', label: this.i18n.L(`$cache.${CacheDescription.Keys}`), width: 100 },
    { id: 'operate', label: this.i18n.L(`$base.${BaseDescription.Operate}`), width: 100, right: 0 }
  ]);

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  clearAllLoading = signal(false);
  data = signal<CacheGroup[]>([]);
  typeMap = new Map<ResourceCode, string>();

  tableCom = viewChild.required<XTableComponent>('tableCom');

  ngOnInit() {
    this.getTypes().subscribe();
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
    return {
      skip: (index - 1) * size,
      take: size,
      orderBy
    };
  }

  resultConvert(body: BasePagination<CacheGroup>) {
    const { data, count } = body;
    const list = data.map((x) => {
      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  action(type: string, cache?: CacheGroup) {
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
        this.messageBox.confirm({
          title: this.i18n.L(`$cache.clear`),
          content: this.i18n.L(`$cache.sureToClearAllCache`),
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.clearAllLoading.set(true);
            this.cacheService
              .deleteAll()
              .pipe(finalize(() => this.clearAllLoading.set(false)))
              .subscribe(() => {
                this.searchForm.reset();
                this.index.set(1);
                this.getTableData();
              });
          }
        });

        break;
      case 'view':
        this.dialog.create(CacheGroupComponent, {
          width: '80rem',
          data: {
            item: cache
          }
        });
        break;
      case 'delete':
        if (!cache) return;
        this.messageBox.confirm({
          title: this.i18n.L(`$cache.delete`),
          content: `${this.i18n.L('$cache.sureToClearCache')} [${this.typeMap.get(cache.type) ?? cache.type}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.cacheService.deleteType(cache.type).subscribe((x) => {
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

  getTypes() {
    return this.resource
      .resourceSelect({
        where: { subject: { code: { equals: 'cache-type' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          for (let resource of x) {
            this.typeMap.set(resource.code, resource.name);
          }
        })
      );
  }
}
