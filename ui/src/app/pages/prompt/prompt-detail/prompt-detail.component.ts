import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { XSelectModule, XSelectNode } from '@ng-nest/ui/select';
import { XButtonComponent } from '@ng-nest/ui/button';
import { XDialogModule, XDialogRef, XDialogService, X_DIALOG_DATA } from '@ng-nest/ui/dialog';
import { XInputComponent } from '@ng-nest/ui/input';
import { XLoadingComponent } from '@ng-nest/ui/loading';
import { XMessageService } from '@ng-nest/ui/message';
import { ModelService, OpenAIInput, PromptService, ResourceService } from '@ui/api';
import { Observable, Subject, finalize, forkJoin, tap } from 'rxjs';
import { AppEditorComponent, AiConversationComponent } from '@ui/core';

@Component({
  selector: 'app-prompt-detail',
  imports: [
    ReactiveFormsModule,
    XLoadingComponent,
    XInputComponent,
    XButtonComponent,
    XDialogModule,
    XSelectModule,
    AppEditorComponent,
    AiConversationComponent
  ],
  templateUrl: './prompt-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptDetailComponent implements OnInit, OnDestroy {
  data = inject<{ id: string; saveSuccess: () => void }>(X_DIALOG_DATA);
  prompt = inject(PromptService);
  resourceService = inject(ResourceService);
  modelService = inject(ModelService);
  fb = inject(FormBuilder);
  message = inject(XMessageService);
  cdr = inject(ChangeDetectorRef);
  dialog = inject(XDialogService);
  dialogRef = inject(XDialogRef<PromptDetailComponent>);
  id = signal('');

  formLoading = signal(false);
  saveLoading = signal(false);

  form!: FormGroup;
  platformList = signal<XSelectNode[]>([]);
  modelList = signal<XSelectNode[]>([]);

  showTestAI = signal(false);
  aiInput = signal<OpenAIInput>({});

  $destroy = new Subject<void>();

  get promptVars() {
    return this.form.controls['promptVars'] as any;
  }

  get varsValid() {
    const values = this.promptVars.getRawValue();
    return values.every((x: any) => !!x.value);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      system: [null],
      prompt: [null, [Validators.required]],
      promptVars: this.fb.array([]),
      platform: [null, [Validators.required]],
      code: [null, [Validators.required]],
      description: [null]
    });
    const { id } = this.data;
    this.id.set(id);

    this.form.get('platform')!.valueChanges.subscribe((platform) => {
      this.getModelList(platform).subscribe();
    });

    this.form.get('prompt')!.valueChanges.subscribe((value: string) => {
      this.promptChange(value);
    });

    const req: Observable<any>[] = [this.getPlatformList()];

    if (this.id()) {
      req.push(
        this.prompt.prompt(this.id()).pipe(
          tap((x) => {
            this.form.patchValue(x);
          })
        )
      );
    }
    this.formLoading.set(true);
    forkJoin(req)
      .pipe(finalize(() => this.formLoading.set(false)))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  save() {
    let rq!: Observable<string>;
    if (!this.id()) {
      rq = this.prompt.create(this.form.value);
    } else {
      rq = this.prompt.update({ id: this.id(), ...this.form.value });
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

  getPlatformList() {
    return this.resourceService
      .resourceSelect({
        where: { subject: { code: { equals: 'model-platform' } } },
        orderBy: [{ sort: 'asc' }]
      })
      .pipe(
        tap((x) => {
          this.platformList.set(x.map(({ code, name }) => ({ id: code, label: name })));
        })
      );
  }

  getModelList(platform: string) {
    return this.modelService.modelSelect({ where: { platform: { equals: platform } } }).pipe(
      tap((x) => {
        this.modelList.set(x.map(({ code, name }) => ({ id: code, label: name })));
      })
    );
  }

  promptChange(value: string) {
    const regex = /\{\{(.*?)\}\}/g;
    let match;
    const extractedVars: { label: string; value: string }[] = [];

    while ((match = regex.exec(value)) !== null) {
      const label = match[1].trim();

      if (label) {
        extractedVars.push({ label, value: '' });
      }
    }

    const uniqueLabels = new Set(extractedVars.map((item) => item.label));
    const uniqueVars = Array.from(uniqueLabels).map((label) => ({ label, value: '' }));

    const promptVarsValue = this.promptVars.getRawValue();
    const labels = promptVarsValue.map((x: any) => x.label);
    for (let label of labels) {
      const item = uniqueVars.find((x) => x.label === label);
      if (!item) this.promptVars.removeAt(promptVarsValue.findIndex((x: any) => x.label === label));
    }
    for (let { label, value } of uniqueVars) {
      const item = promptVarsValue.find((x: any) => x.label === label);
      if (!item) {
        this.promptVars.push(
          this.fb.group({
            label: [{ disabled: true, value: label }],
            value
          })
        );
      }
    }
    this.cdr.detectChanges();
  }

  sendTest() {
    let { system, prompt, platform, code, promptVars } = this.form.getRawValue();
    for (let { label, value } of promptVars) {
      const reg = new RegExp(`\\{\\{\\s*${label}\\s*\\}\\}`, 'g');
      prompt = prompt.replace(reg, value);
    }
    this.aiInput.set({
      platform: platform,
      system,
      prompt: prompt,
      model: code
    });
    this.showTestAI.set(true);
  }
}
