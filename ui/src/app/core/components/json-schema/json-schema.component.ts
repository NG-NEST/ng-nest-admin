import {
  Component,
  effect,
  forwardRef,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import { XTreeComponent } from '@ng-nest/ui/tree';
import { AppJsonSchemaService } from './json-schema.service';
import {
  ControlValueAccessor,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule
} from '@angular/forms';
import { debounceTime, finalize, mergeMap, Subject, takeUntil } from 'rxjs';
import { AppNodeComponent } from './node/node.component';
import { AppTreeComponent } from './tree/tree.component';
import { XJsonSchema, XTreeData } from './json-schema.type';
import { XJsonSchemaToTreeDataWorker, XTreeDataToJsonSchemaWorker } from './worker/worker';
import { XLoadingComponent } from '@ng-nest/ui';
import { AppOperationComponent } from './operation/operation.component';

@Component({
  selector: 'app-json-schema',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AppNodeComponent,
    AppTreeComponent,
    AppOperationComponent,
    XLoadingComponent
  ],
  templateUrl: './json-schema.component.html',
  styleUrls: ['./json-schema.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppJsonSchemaComponent),
      multi: true
    }
  ]
})
export class AppJsonSchemaComponent implements ControlValueAccessor, OnInit, OnDestroy {
  fb = inject(FormBuilder);
  jss = inject(AppJsonSchemaService);
  title = input<string>('');
  disabled = model<boolean>(false);

  treeCom = viewChild.required<XTreeComponent>('treeCom');

  treeData = signal<XTreeData[]>([]);

  loading = signal(false);
  dragging = signal(false);
  dragNode = signal<XTreeData | null>(null);
  hoverNode = signal<XTreeData | null>(null);

  form = this.fb.group({
    tree: this.fb.array([])
  });

  value: XJsonSchema = {};
  private onChange: (value: XJsonSchema) => void = () => {};
  onTouched: () => void = () => {};

  get treeArrayForm() {
    return this.form.get('tree') as FormArray<FormGroup<any>>;
  }

  getTreeNodeForm(node: XTreeData) {
    return this.treeArrayForm.controls.find((x) => x.controls['id'].getRawValue() === node.id)!;
  }

  $destroy = new Subject<void>();

  constructor() {
    effect(() => {
      const disabled = this.disabled();
      const formDisabled = this.form.disabled;
      if (disabled && formDisabled === false) {
        this.form.disable();
      } else if (!disabled && formDisabled === true) {
        this.form.enable();
      }
    });
  }

  writeValue(value: XJsonSchema) {
    this.value = value;
    this.setTreeData();
  }

  ngOnInit() {
    this.setTreeData();
  }

  ngAfterViewInit() {
    this.treeArrayForm.valueChanges
      .pipe(
        debounceTime(100),
        mergeMap(() => this.getJsonSchema()),
        takeUntil(this.$destroy)
      )
      .subscribe((x) => {
        this.value = x;
        this.onChange(this.value);
      });
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  setTreeData() {
    const data = this.value;
    this.loading.set(true);
    XJsonSchemaToTreeDataWorker(data)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntil(this.$destroy)
      )
      .subscribe((x) => {
        this.treeArrayForm.clear();
        const buildTreeForm = this.jss.buildTreeForm(x);
        for (let form of buildTreeForm) {
          this.treeArrayForm.push(form);
        }
        this.treeData.set(x);
      });
  }

  getJsonSchema() {
    return XTreeDataToJsonSchemaWorker(this.treeData()).pipe(takeUntil(this.$destroy));
  }

  registerOnChange(fn: (value: XJsonSchema) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled.set(isDisabled);
  }
}
