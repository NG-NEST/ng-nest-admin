import { Component, Inject, OnDestroy, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XRadioComponent } from '@ng-nest/ui';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { CatalogueService } from '@ui/api';
import { Observable, Subject, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-catalogue',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XRadioComponent
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit, OnDestroy {
  dialogRef = inject(XDialogRef<CatalogueComponent>);
  id = signal('');
  resourceId = signal('');
  type = signal('');

  title = computed(() => {
    if (this.type() === 'add-root') return '添加根节点';
    return '';
  });

  get typeName() {
    const { type } = this.form.getRawValue();
    if (type === 'Folder') return '文件夹名称';
    else if (type === 'File') return '文件名称';
    return '';
  }

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;

  $destroy = new Subject<void>();
  constructor(
    @Inject(X_DIALOG_DATA)
    public data: { id: string; type: string; resourceId: string; saveSuccess: () => void },
    private catalogue: CatalogueService,
    private fb: FormBuilder,
    private message: XMessageService
  ) {
    const { id, resourceId, type } = this.data;
    this.id.set(id);
    this.type.set(type);
    this.resourceId.set(resourceId);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['Folder', [Validators.required]],
      name: ['', [Validators.required]],
      resourceId: [this.resourceId(), [Validators.required]],
      sort: [0, [Validators.required]],
      description: ['']
    });

    if (this.id()) {
      this.formLoading.set(true);
      this.catalogue
        .catalogue(this.id())
        .pipe(
          tap((x) => {
            this.form.patchValue(x);
          }),
          finalize(() => this.formLoading.set(false))
        )
        .subscribe();
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id()) {
      rq = this.catalogue.create(this.form.value);
    } else {
      rq = this.catalogue.update({ id: this.id(), ...this.form.value });
    }
    this.saveLoading.set(true);
    rq.pipe(
      tap((x) => {
        this.message.success(x);
        this.dialogRef.close();
        this.data.saveSuccess();
      }),
      finalize(() => {
        this.saveLoading.set(false);
      })
    ).subscribe();
  }
}
