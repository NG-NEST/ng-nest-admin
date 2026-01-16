import { DatePipe } from '@angular/common';
import { Component, OnDestroy, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { XI18nPipe } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { CacheService, Cache } from '@ui/api';
import { AppEditorComponent } from '@ui/core';
import { Subject, finalize } from 'rxjs';

@Component({
  selector: 'app-cache-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XButtonComponent,
    XDialogModule,
    XI18nPipe,
    DatePipe,
    AppEditorComponent
  ],
  templateUrl: './cache-detail.component.html'
})
export class CacheDetailComponent implements OnDestroy {
  dialogRef = inject(XDialogRef<CacheDetailComponent>);
  cache = inject(CacheService);
  fb = inject(FormBuilder);
  data = inject<{ key: string }>(X_DIALOG_DATA);
  message = inject(XMessageService);

  key = signal<string>('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form = this.fb.group({
    jsonContent: ['']
  });
  typeMap = new Map<string, string>();
  $destroy = new Subject<void>();

  item = signal<Cache | null>(null);

  constructor() {
    const { key } = this.data;
    this.key.set(key);
  }

  ngOnInit(): void {
    this.formLoading.set(true);
    this.cache
      .cache(this.key())
      .pipe(finalize(() => this.formLoading.set(false)))
      .subscribe((x) => {
        this.item.set(x);
        this.form.patchValue({ jsonContent: JSON.stringify(JSON.parse(x.value), null, 2) });
      });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}
