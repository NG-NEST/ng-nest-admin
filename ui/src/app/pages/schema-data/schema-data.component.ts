import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal, viewChild, computed } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import {
  Schema,
  SchemaData,
  SchemaDataService,
  SchemaDataWhereInput,
  SchemaService
} from '@ui/api';
import {
  AppAuthDirective,
  AppJsonDialogComponent,
  AppSortVersions,
  BaseDescription,
  BaseOrder,
  BasePagination,
  XJsonSchema,
  XJsonSchemaToTableColumns
} from '@ui/core';
import { concatMap, delay, finalize, of, Subject, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { SchemaDataDetailComponent } from './schema-data-detail/schema-data-detail.component';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XCascadeComponent, XCascadeNode } from '@ng-nest/ui/cascade';
import { first, groupBy } from 'lodash-es';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';

@Component({
  selector: 'app-schema-data',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XCascadeComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XTooltipDirective,
    JsonPipe,
    AppAuthDirective
  ],
  templateUrl: './schema-data.component.html',
  providers: [DatePipe]
})
export class SchemaDataComponent {
  datePipe = inject(DatePipe);
  schemaDataService = inject(SchemaDataService);
  schemaService = inject(SchemaService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  messageBox = inject(XMessageBoxService);
  dialog = inject(XDialogService);

  searchForm = this.fb.group({
    schemaId: [null]
  });

  schemaJson = signal<XJsonSchema | null>(null);

  columns = computed<XTableColumn[]>(() => {
    let columns: XTableColumn[] = [];
    const schemaJson = this.schemaJson();
    console.log(schemaJson);
    if (!schemaJson) return columns;
    const cols = XJsonSchemaToTableColumns(schemaJson);
    if (cols) {
      const createdAt = cols.find((x) => x.id === 'createdAt');
      const updatedAt = cols.find((x) => x.id === 'updatedAt');
      if (createdAt) {
        createdAt.width = 200;
      } else {
        cols.push({ id: 'createdAt', label: BaseDescription.CreatedAt, width: 200 });
      }
      if (updatedAt) {
        updatedAt.width = 200;
      } else {
        cols.push({ id: 'updatedAt', label: BaseDescription.UpdatedAt, width: 200 });
      }
    }
    columns = [
      { id: 'index', type: 'index', left: 0, label: BaseDescription.Index, width: 70 },
      ...cols,
      { id: 'operate', label: BaseDescription.Operate, width: 160, right: 0 }
    ];
    return columns;
  });

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  data = signal<SchemaData[]>([]);
  schemaList = signal<XCascadeNode[]>([]);

  tableCom = viewChild.required<XTableComponent>('tableCom');
  $destroy = new Subject<void>();

  ngOnInit() {
    this.searchForm.controls.schemaId.valueChanges
      .pipe(
        concatMap((x) => this.getSchema(x!)),
        concatMap(() => {
          this.index.set(1);
          this.tableLoading.set(true);
          return this.getTableData().pipe(finalize(() => this.tableLoading.set(false)));
        }),

        takeUntil(this.$destroy)
      )
      .subscribe();

    this.getSchemaList().subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  indexChange() {
    this.tableLoading.set(true);
    this.getTableData()
      .pipe(finalize(() => this.tableLoading.set(false)))
      .subscribe();
  }

  sizeChange() {
    this.index.set(1);
    this.tableLoading.set(true);
    this.getTableData()
      .pipe(finalize(() => this.tableLoading.set(false)))
      .subscribe();
  }

  getSchema(id: string) {
    if (!id) return of(null);
    return this.schemaService.schema(id).pipe(
      tap((x) => {
        this.schemaJson.set(x.json as XJsonSchema);
      })
    );
  }

  getTableData() {
    const { schemaId } = this.searchForm.getRawValue();
    if (!schemaId) return of({ count: 0, data: [] });
    return this.schemaDataService.schemaDatas(this.setParams(this.index(), this.size())).pipe(
      delay(300),
      tap((x) => {
        return this.resultConvert(x);
      })
    );
  }

  setParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: SchemaDataWhereInput = {};

    const { schemaId } = this.searchForm.getRawValue();
    if (!XIsEmpty(schemaId)) where.schemaId = { equals: schemaId! };

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy,
      where
    };
  }

  resultConvert(body: BasePagination<SchemaData>) {
    const { data, count } = body;
    const list = data.map((x) => {
      const dt = x.data as any;
      x.createdAt = this.datePipe.transform(dt.createdAt ?? x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(dt.updatedAt ?? x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      delete dt.createdAt;
      delete dt.updatedAt;
      Object.assign(x, dt);

      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  getSchemaList() {
    return this.schemaService.schemaSelect({}).pipe(
      tap((x) => {
        const res = x.map((y: any) => {
          y.label = y.name;
          return y;
        });
        const group = groupBy(res, (y) => y.code);
        const list: XCascadeNode[] = [];
        let select: XCascadeNode | null = null;
        for (let key in group) {
          const one = first(group[key]) as Schema;
          list.push({ id: one.code, label: one.name });
          const sortList = AppSortVersions(group[key], 'desc');
          for (let item of sortList) {
            list.push({ id: item.id, label: item.version, pid: one.code });
          }
          if (select === null && sortList.length > 0) {
            select = sortList[0];

            this.searchForm.patchValue({ schemaId: select!.id });
          }
        }
        this.schemaList.set(list);
      })
    );
  }

  action(type: string, schemaData?: SchemaData | XJsonSchema) {
    switch (type) {
      case 'search':
        this.searchLoading.set(true);
        this.tableLoading.set(true);
        this.index.set(1);
        this.getTableData()
          .pipe(finalize(() => (this.tableLoading.set(false), this.searchLoading.set(false))))
          .subscribe();
        break;
      case 'reset':
        this.resetLoading.set(true);
        this.tableLoading.set(true);
        this.index.set(1);
        this.getTableData()
          .pipe(finalize(() => (this.tableLoading.set(false), this.resetLoading.set(false))))
          .subscribe();
        break;
      case 'add':
        this.dialog.create(SchemaDataDetailComponent, {
          width: '100%',
          height: '100%',
          data: {
            schemaId: this.searchForm.controls.schemaId.value,
            saveSuccess: () => {
              this.index.set(1);
              this.tableLoading.set(true);
              this.getTableData()
                .pipe(finalize(() => this.tableLoading.set(false)))
                .subscribe();
            }
          }
        });
        break;
      case 'edit':
        schemaData = schemaData as SchemaData;
        this.dialog.create(SchemaDataDetailComponent, {
          width: '100%',
          height: '100%',
          data: {
            id: schemaData?.id,
            schemaId: this.searchForm.controls.schemaId.value,
            saveSuccess: () => {
              this.tableLoading.set(true);
              this.getTableData()
                .pipe(finalize(() => this.tableLoading.set(false)))
                .subscribe();
            }
          }
        });
        break;
      case 'delete':
        if (!schemaData) return;
        this.messageBox.confirm({
          title: '删除数据',
          content: `确认删除此数据吗？ `,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            schemaData = schemaData as SchemaData;
            this.schemaDataService.delete(schemaData.id).subscribe((x) => {
              this.message.success(x);
              if (this.data().length === 1 && this.index() > 1) {
                this.index.update((x) => --x);
              }
              this.getTableData();
            });
          }
        });
        break;
      case 'view-json-schema':
        this.dialog.create(AppJsonDialogComponent, {
          width: '100%',
          height: '100%',
          data: {
            title: 'JsonSchema 数据',
            disabled: true,
            content: schemaData as XJsonSchema
          }
        });
        break;
      case 'view-json':
        this.dialog.create(AppJsonDialogComponent, {
          width: '100%',
          height: '100%',
          data: {
            title: 'Json 数据',
            disabled: true,
            content: schemaData
          }
        });
        break;
    }
  }
}
