import { DatePipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import { Schema, SchemaDescription, SchemaService, SchemaWhereInput } from '@ui/api';
import { AppAuthDirective, BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, finalize, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { SchemaDetailComponent } from './schema-detail/schema-detail.component';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XI18nPipe, XI18nService } from '@ng-nest/ui';

@Component({
  selector: 'app-schema',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XI18nPipe,
    AppAuthDirective
  ],
  templateUrl: './schema.component.html',
  providers: [DatePipe]
})
export class SchemaComponent {
  datePipe = inject(DatePipe);
  schemaService = inject(SchemaService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  messageBox = inject(XMessageBoxService);
  dialog = inject(XDialogService);
  i18n = inject(XI18nService);

  searchForm = this.fb.group({
    name: [null],
    code: [null]
  });

  columns = signal<XTableColumn[]>([
    { id: 'index', type: 'index', left: 0, label: this.i18n.L(BaseDescription.Index), width: 70 },
    { id: 'name', label: this.i18n.L(SchemaDescription.Name), width: 200, left: 70 },
    { id: 'code', label: this.i18n.L(SchemaDescription.Code) },
    { id: 'version', label: this.i18n.L(SchemaDescription.Version), width: 100 },
    { id: 'createdAt', label: this.i18n.L(BaseDescription.CreatedAt), width: 180 },
    { id: 'updatedAt', label: this.i18n.L(BaseDescription.UpdatedAt), width: 180 },
    { id: 'operate', label: this.i18n.L(BaseDescription.Operate), width: 160, right: 0 }
  ]);

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  data = signal<Schema[]>([]);

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
    this.schemaService
      .schemas(this.setParams(this.index(), this.size()))
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
    const where: SchemaWhereInput = {};

    const { name, code } = this.searchForm.value;
    if (!XIsEmpty(name)) where.name = { contains: name! };
    if (!XIsEmpty(code)) where.code = { contains: code! };

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy,
      where
    };
  }

  resultConvert(body: BasePagination<Schema>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  action(type: string, schema?: Schema) {
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
        this.dialog.create(SchemaDetailComponent, {
          width: '60rem',
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
        this.dialog.create(SchemaDetailComponent, {
          width: '70rem',
          data: {
            id: schema?.id,
            saveSuccess: () => {
              this.getTableData();
            }
          }
        });
        break;
      case 'delete':
        if (!schema) return;
        this.messageBox.confirm({
          title: this.i18n.L('$schema.deleteSchema'),
          content: `${this.i18n.L('$schema.sureToDeleteSchema')} [${schema.name}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.schemaService.delete(schema.id).subscribe((x) => {
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
}
