import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, signal, viewChild, computed } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { XTableColumn, XTableComponent, XTableModule } from '@ng-nest/ui/table';
import { SchemaData, SchemaDataService, SchemaDataWhereInput, SchemaService } from '@ui/api';
import {
  AppJsonDialogComponent,
  BaseDescription,
  BaseOrder,
  BasePagination,
  XJsonSchema,
  XJsonSchemaToTableColumns
} from '@ui/core';
import { concatMap, delay, finalize, of, Subject, takeUntil, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { X_DIALOG_DATA, XDialogModule, XDialogRef, XDialogService } from '@ng-nest/ui/dialog';
import { XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import {
  XButtonComponent,
  XLinkComponent,
  XLoadingComponent,
  XRadioComponent,
  XTooltipModule
} from '@ng-nest/ui';

@Component({
  selector: 'app-select-schema-data',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XTableModule,
    XButtonComponent,
    XLoadingComponent,
    XTooltipModule,
    XRadioComponent,
    XDialogModule,
    XLinkComponent,
    JsonPipe
  ],
  templateUrl: './select-schema-data.component.html',
  providers: [DatePipe]
})
export class SelectSchemaDataComponent {
  dialogRef = inject(XDialogRef<SelectSchemaDataComponent>);
  inputData = inject<{
    schemaId: string;
    title: string;
    saveSuccess: (data: { [key: string]: any }) => void;
  }>(X_DIALOG_DATA);
  title = signal<string | null>(null);
  schemaId = signal<string | null>(null);
  selectId = signal<string | null>(null);
  selectChange = toObservable(this.selectId);
  selectData = signal<{ [key: string]: any } | null>(null);

  datePipe = inject(DatePipe);
  schemaDataService = inject(SchemaDataService);
  schemaService = inject(SchemaService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  messageBox = inject(XMessageBoxService);
  dialog = inject(XDialogService);

  searchForm = this.fb.group({
    schemaId: ['']
  });

  schemaJson = signal<XJsonSchema | null>(null);

  selectDisabled = computed(() => {
    return !this.selectData();
  });

  columns = computed<XTableColumn[]>(() => {
    let columns: XTableColumn[] = [];
    const schemaJson = this.schemaJson();
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
      { id: '$radio', width: 70, left: 0 },
      { id: 'index', type: 'index', left: 70, label: BaseDescription.Index, width: 70 },
      ...cols
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

  tableCom = viewChild.required<XTableComponent>('tableCom');
  $destroy = new Subject<void>();

  constructor() {
    const { schemaId, title } = this.inputData;
    this.schemaId.set(schemaId);
    this.title.set(title);
  }

  ngOnInit() {
    this.searchForm.patchValue({ schemaId: this.schemaId() });
    this.tableLoading.set(true);
    this.getSchema(this.schemaId()!)
      .pipe(
        concatMap(() => this.getTableData()),
        finalize(() => this.tableLoading.set(false))
      )
      .subscribe();

    this.selectChange.pipe(takeUntil(this.$destroy)).subscribe((x) => {
      if (x) {
        const dt = this.data().find((y) => y.id === x);
        if (dt) {
          this.selectData.set(dt.data as object);
        }
      }
    });
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
            content: schemaData as XJsonSchema
          }
        });
        break;
    }
  }

  selectSave() {
    this.dialogRef.close();
    this.inputData.saveSuccess(this.selectData()!);
  }
}
