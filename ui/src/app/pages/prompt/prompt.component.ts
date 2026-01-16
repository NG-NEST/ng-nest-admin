import { DatePipe } from '@angular/common';
import { Component, inject, signal, viewChild } from '@angular/core';
import { XIsEmpty } from '@ng-nest/ui/core';
import { XTableColumn, XTableComponent } from '@ng-nest/ui/table';
import {
  ModelService,
  Prompt,
  PromptDescription,
  PromptService,
  PromptWhereInput,
  ResourceService
} from '@ui/api';
import { AppAuthDirective, BaseDescription, BaseOrder, BasePagination } from '@ui/core';
import { delay, finalize, of, tap } from 'rxjs';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XDialogService } from '@ng-nest/ui/dialog';
import { PromptDetailComponent } from './prompt-detail/prompt-detail.component';
import { XMessageBoxAction, XMessageBoxService } from '@ng-nest/ui/message-box';
import { XMessageService } from '@ng-nest/ui/message';
import { XInputComponent } from '@ng-nest/ui/input';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XLinkComponent } from '@ng-nest/ui/link';
import { XSelectComponent, XSelectNode } from '@ng-nest/ui/select';
import { XI18nPipe, XI18nService } from '@ng-nest/ui';

@Component({
  selector: 'app-prompt',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    XInputComponent,
    XButtonComponent,
    XLoadingComponent,
    XTableComponent,
    XLinkComponent,
    XSelectComponent,
    XI18nPipe,
    AppAuthDirective
  ],
  templateUrl: './prompt.component.html',
  providers: [DatePipe]
})
export class PromptComponent {
  datePipe = inject(DatePipe);
  promptService = inject(PromptService);
  resourceService = inject(ResourceService);
  modelService = inject(ModelService);
  i18n = inject(XI18nService);

  fb = inject(FormBuilder);
  dialog = inject(XDialogService);
  message = inject(XMessageService);
  messageBox = inject(XMessageBoxService);

  platformList = signal<XSelectNode[]>([]);
  modelList = signal<XSelectNode[]>([]);
  platformMap = new Map<string, string>();
  modelMap = new Map<string, string>();
  modelAllMap = new Map<string, string>();

  searchForm = this.fb.group({
    name: [null],
    platform: [null],
    code: [null]
  });

  columns = signal<XTableColumn[]>([
    {
      id: 'index',
      type: 'index',
      left: 0,
      label: this.i18n.L(`$base.${BaseDescription.Index}`),
      width: 70
    },
    { id: 'platform', label: this.i18n.L(`$prompt.${PromptDescription.Platform}`), width: 180 },
    { id: 'code', label: this.i18n.L(`$prompt.${PromptDescription.Code}`) },
    { id: 'name', label: this.i18n.L(`$prompt.${PromptDescription.Name}`) },
    { id: 'description', label: this.i18n.L(`$base.description`) },
    { id: 'createdAt', label: this.i18n.L(`$base.createdAt`), width: 180 },
    { id: 'updatedAt', label: this.i18n.L(`$base.updatedAt`), width: 180 },
    { id: 'operate', label: this.i18n.L(`$base.operate`), width: 160, right: 0 }
  ]);

  total = signal(0);
  index = signal(1);
  size = signal(10);
  tableLoading = signal(false);
  resetLoading = signal(false);
  searchLoading = signal(false);
  data = signal<Prompt[]>([]);

  tableCom = viewChild.required<XTableComponent>('tableCom');

  ngOnInit() {
    this.getplatformList().subscribe();
    this.getAllModelList().subscribe();
    this.getTableData();

    this.searchForm.get('platform')!.valueChanges.subscribe((platform: any) => {
      this.getModelList(platform).subscribe();
    });
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
    this.promptService
      .prompts(this.setParams(this.index(), this.size()))
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

  getplatformList() {
    return this.resourceService
      .resourceSelect({
        where: { subject: { code: { equals: 'model-platform' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.platformList.set(x.map(({ code, name }) => ({ id: code, label: name })));
          for (let { code, name } of x) {
            this.platformMap.set(code as string, name);
          }
        })
      );
  }

  getModelList(platform: string) {
    if (!platform) {
      this.modelList.set([]);
      return of([]);
    }
    return this.modelService.modelSelect({ where: { platform: { equals: platform } } }).pipe(
      tap((x) => {
        this.modelList.set(x.map(({ code, name }) => ({ id: code, label: name })));
      })
    );
  }

  getAllModelList() {
    return this.modelService.modelSelect({}).pipe(
      tap((x) => {
        for (let { code, name } of x) {
          this.modelAllMap.set(code, name);
        }
      })
    );
  }

  setParams(index: number, size: number) {
    const orderBy: BaseOrder[] = [{ createdAt: 'desc' }];
    const where: PromptWhereInput = {};
    const { name, platform, code } = this.searchForm.value;
    if (!XIsEmpty(name)) where.name = { contains: name! };
    if (!XIsEmpty(platform)) where.platform = { equals: platform! };
    if (!XIsEmpty(code)) where.code = { equals: code! };

    return {
      skip: (index - 1) * size,
      take: size,
      orderBy,
      where
    };
  }

  resultConvert(body: BasePagination<Prompt>) {
    const { data, count } = body;
    const list = data.map((x) => {
      x.createdAt = this.datePipe.transform(x.createdAt, 'yyyy-MM-dd HH:mm:ss')!;
      x.updatedAt = this.datePipe.transform(x.updatedAt, 'yyyy-MM-dd HH:mm:ss')!;
      return x;
    });

    this.total.set(count!);
    this.data.set(list);
  }

  action(type: string, prompt?: Prompt) {
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
        this.dialog.create(PromptDetailComponent, {
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
        this.dialog.create(PromptDetailComponent, {
          data: {
            id: prompt?.id,
            saveSuccess: () => {
              this.getTableData();
            }
          }
        });
        break;
      case 'delete':
        if (!prompt) return;
        this.messageBox.confirm({
          title: this.i18n.L(`$prompt.deletePrompt`),
          content: `${this.i18n.L(`$prompt.sureToDeletePrompt`)} [${prompt.name}]`,
          type: 'warning',
          callback: (data: XMessageBoxAction) => {
            if (data !== 'confirm') return;
            this.promptService.delete(prompt.id).subscribe((x) => {
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
