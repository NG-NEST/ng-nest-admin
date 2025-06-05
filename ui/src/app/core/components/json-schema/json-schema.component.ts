import {
  Component,
  model,
  OnDestroy,
  OnInit,
  signal,
  SimpleChanges,
  viewChild
} from '@angular/core';
import { XTreeComponent } from '@ng-nest/ui/tree';
import { AppJsonSchemaService } from './json-schema.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { delay, finalize, Subject, takeUntil } from 'rxjs';
import { AppNodeComponent } from './node/node.component';
import { AppTreeComponent } from './tree/tree.component';
import { XJsonSchema, XTreeData } from './json-schema.type';
import { XJsonSchemaToTreeDataWorker, XTreeDataToJsonSchemaWorker } from './worker/worker';
import { XIsChange, XLoadingComponent } from '@ng-nest/ui';
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
  styleUrls: ['./json-schema.component.scss']
})
export class AppJsonSchemaComponent implements OnInit, OnDestroy {
  data = model<XJsonSchema>({});

  treeCom = viewChild.required<XTreeComponent>('treeCom');

  treeData = signal<XTreeData[]>([]);

  loading = signal(false);

  dragging = signal(false);
  dragNode = signal<XTreeData | null>(null);

  form = this.fb.group({
    tree: this.fb.array([])
  });

  get treeArrayForm() {
    return this.form.get('tree') as FormArray<FormGroup<any>>;
  }

  getTreeNodeForm(node: XTreeData) {
    return this.treeArrayForm.controls.find((x) => x.controls['id'].getRawValue() === node.id)!;
  }

  $destroy = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private jss: AppJsonSchemaService
  ) {}

  ngOnInit() {
    this.setTreeData();
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    XIsChange(data) && this.setTreeData();
  }

  setTreeData() {
    const data = this.data();
    this.loading.set(true);
    XJsonSchemaToTreeDataWorker(data)
      .pipe(
        delay(100),
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
}
