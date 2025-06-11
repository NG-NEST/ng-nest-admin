import { JsonPipe } from '@angular/common';
import { Component, Inject, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XLinkComponent } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, XDialogService, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { CacheGroup, CacheMessage, CacheService, ResourceService } from '@ui/api';
import { AppBase64ToStringPipe } from '@ui/core';
import { Subject, tap } from 'rxjs';
import { CacheDetailComponent } from '../cache-detail/cache-detail.component';

@Component({
  selector: 'app-cache-group',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XButtonComponent,
    XLinkComponent,
    XDialogModule,
    JsonPipe
  ],
  templateUrl: './cache-group.component.html',
  styleUrl: './cache-group.component.scss',
  providers: [AppBase64ToStringPipe]
})
export class CacheGroupComponent implements OnDestroy {
  dialogRef = inject(XDialogRef<CacheGroupComponent>);
  cache = inject(CacheService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  dialog = inject(XDialogService);
  base64ToString = inject(AppBase64ToStringPipe);

  type = signal<string>('');
  list = signal<{ key: string; json: any }[]>([]);

  formLoading = signal(false);
  saveLoading = signal(false);

  typeMap = new Map<string, string>();

  $destroy = new Subject<void>();

  constructor(
    @Inject(X_DIALOG_DATA) public data: { item: CacheGroup },
    private resource: ResourceService
  ) {
    const { item } = this.data;
    if (!item) return;
    const { type, keys } = item;
    this.type.set(type);
    this.list.update(() => {
      let result = [];
      for (let key of keys) {
        try {
          result.push({
            key,
            json: this.base64ToString.transform(key)
          });
        } catch (e) {}
      }
      return result;
    });
  }

  ngOnInit() {
    this.getTypes().subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  action(type: string, key: string) {
    switch (type) {
      case 'view':
        this.dialog.create(CacheDetailComponent, {
          width: '100%',
          height: '100%',
          data: {
            key: `${this.type()}:${key}`
          }
        });
        break;
      case 'delete':
        this.cache.delete(`${this.type()}:${key}`).subscribe(() => {
          this.list.update((x) => x.filter((y) => y.key !== key));
          this.message.success(CacheMessage.DeletedSuccess);
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
