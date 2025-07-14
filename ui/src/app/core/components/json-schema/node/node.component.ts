import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
  signal,
  viewChild
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { XSelectComponent } from '@ng-nest/ui/select';
import { AdjustWidthDirective } from '../adjust-width/adjust-width.directive';
import { delay, finalize, of, Subject, takeUntil, timer } from 'rxjs';
import { v4 } from 'uuid';
import { XIconComponent } from '@ng-nest/ui/icon';
import { XPopoverDirective } from '@ng-nest/ui/popover';
import { XTextareaComponent } from '@ng-nest/ui/textarea';
import { XDropdownComponent, XDropdownNode } from '@ng-nest/ui/dropdown';
import { AppTreeComponent } from '../tree/tree.component';
import { XJsonSchemaType, XJsonSchemaTypes, XTreeData } from '../json-schema.type';
import { XDialogService } from '@ng-nest/ui/dialog';
import { AppSettingComponent } from '../setting/setting.component';
import { XTooltipDirective } from '@ng-nest/ui/tooltip';
import { AppJsonSchemaComponent } from '../json-schema.component';

@Component({
  selector: 'app-node',
  imports: [
    ReactiveFormsModule,
    XSelectComponent,
    XIconComponent,
    XPopoverDirective,
    XTooltipDirective,
    XTextareaComponent,
    XDropdownComponent,
    AdjustWidthDirective
  ],
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppNodeComponent implements OnInit, OnDestroy {
  node = model.required<XTreeData>();
  form = input.required<FormGroup<any>>();
  tree = input.required<AppTreeComponent>();
  level = input.required<number>();
  dialog = inject(XDialogService);
  cdr = inject(ChangeDetectorRef);
  schema = inject(AppJsonSchemaComponent);
  cdkTree = computed(() => this.tree().tree());
  descriptionCtl = viewChild<XTextareaComponent>('descriptionCtl');
  typeList = XJsonSchemaTypes;
  $destory = new Subject<void>();
  showDescriptionPopover = signal(false);
  isDeleteConfirm = signal(false);

  typeChange = new Subject<XJsonSchemaType>();
  nodeChange = new Subject<XTreeData>();

  get isRoot() {
    return this.node().name === '$root';
  }

  get isObjectNull() {
    const { type, children } = this.node();
    return type === 'object' && (!children || children!.length === 0);
  }

  ngOnInit() {
    this.typeChange.pipe(takeUntil(this.$destory)).subscribe((type) => {
      this.form().patchValue({ type });
    });
    this.nodeChange.pipe(takeUntil(this.$destory)).subscribe((x) => {
      this.node.update((y) => {
        Object.assign(y, x);
        return y;
      });
      this.cdr.detectChanges();
    });
    if (!this.form()) return;
    this.form()
      .controls['name'].valueChanges.pipe(takeUntil(this.$destory))
      .subscribe((x) => {
        this.node.update((y) => {
          y.name = x;
          return y;
        });
      });
    this.form()
      .controls['type'].valueChanges.pipe(takeUntil(this.$destory))
      .subscribe((x) => {
        this.onTypeChange(x);
      });
    this.form()
      .controls['title'].valueChanges.pipe(takeUntil(this.$destory))
      .subscribe((x) => {
        this.node.update((y) => {
          y.title = x;
          return y;
        });
      });
    this.form()
      .controls['description'].valueChanges.pipe(takeUntil(this.$destory))
      .subscribe((x) => {
        this.node.update((y) => {
          y.description = x;
          return y;
        });
      });
  }

  ngOnDestroy() {
    this.$destory.next();
    this.$destory.complete();
  }

  onTypeChange(type: XJsonSchemaType) {
    this.changeNodeValue(this.node().type as XJsonSchemaType, type, this.node());
    this.node.update((y) => {
      y.type = type;
      return y;
    });
    if (type === 'array') {
      this.addSubNode(this.node(), type);
    }
    if (type === 'null') {
      this.onNullable(false);
    }
  }

  onSetting() {
    this.dialog.create(AppSettingComponent, {
      width: '36rem',
      data: {
        node: this.node(),
        typeChange: this.typeChange,
        nodeChange: this.nodeChange
      }
    });
  }

  onDragstart(_event: DragEvent, node: XTreeData) {
    this.schema.dragNode.set(node);
    this.schema.dragging.set(true);
  }

  onDragend() {
    this.schema.dragNode.set(null);
    this.schema.dragging.set(false);
  }

  deleteConfirm() {
    this.isDeleteConfirm.set(true);
    timer(3000)
      .pipe(
        finalize(() => this.isDeleteConfirm.set(false)),
        takeUntil(this.$destory)
      )
      .subscribe();
  }

  deleteNode(node: XTreeData) {
    this.tree().deleteNode(node);
  }

  dropdownClick(dropdown: XDropdownNode, node: XTreeData) {
    if (dropdown.id === 1) {
      this.addAdjoinNode(node);
    } else if (dropdown.id === 2) {
      this.addSubNode(node);
    }
  }

  getParentNode(node: XTreeData): XTreeData {
    return this.tree().getParentNode(node)!;
  }

  onShowDescription() {
    if (this.showDescriptionPopover()) {
      of(true)
        .pipe(delay(300))
        .subscribe(() => {
          this.descriptionCtl()?.textareaRef().nativeElement.focus();
        });
    }
  }

  isEmpty(value: any) {
    if (typeof value === 'string') {
      return !!value.trim();
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return [null, undefined].includes(value);
  }

  getIsSetting(node: XTreeData) {
    if (node.type === 'string') {
      return (
        node.deprecated ||
        node.isEnum ||
        node.isConst ||
        !this.isEmpty(node.format) ||
        ![0, undefined, null].includes(node.behavior) ||
        !this.isEmpty(node.minLength) ||
        !this.isEmpty(node.maxLength) ||
        !this.isEmpty(node.default) ||
        !this.isEmpty(node.pattern) ||
        !this.isEmpty(node.examples)
      );
    } else if (node.type === 'integer' || node.type === 'number') {
      return (
        node.deprecated ||
        node.isEnum ||
        node.isConst ||
        !this.isEmpty(node.format) ||
        ![0, undefined, null].includes(node.behavior) ||
        !this.isEmpty(node.minimum) ||
        !this.isEmpty(node.maximum) ||
        !this.isEmpty(node.default) ||
        !this.isEmpty(node.multipleOf) ||
        !this.isEmpty(node.examples)
      );
    } else if (node.type === 'boolean') {
      return (
        node.deprecated ||
        ![0, undefined, null].includes(node.behavior) ||
        !this.isEmpty(node.default)
      );
    } else if (node.type === 'array') {
      return (
        node.deprecated ||
        ![0, undefined, null].includes(node.behavior) ||
        !this.isEmpty(node.minItems) ||
        !this.isEmpty(node.maxItems) ||
        node.uniqueItems
      );
    } else if (node.type === 'object') {
      return (
        node.deprecated ||
        ![0, undefined, null].includes(node.behavior) ||
        !this.isEmpty(node.minProperties) ||
        !this.isEmpty(node.maxProperties) ||
        ![true, undefined, null].includes(node.additionalProperties as boolean)
      );
    }

    return false;
  }

  onNullable(value: boolean) {
    this.node.update((x) => {
      x.nullable = !value;
      return x;
    });
    this.form().patchValue({ nullable: this.node().nullable });
  }

  onRequired(value: boolean | string[]) {
    this.node.update((x) => {
      x.required = !value;
      return x;
    });
    this.form().patchValue({ required: this.node().required });
  }

  onJsonSchema(value: boolean) {
    this.node.update((x) => {
      x.isJsonSchema = !value;
      return x;
    });
    this.form().patchValue({ isJsonSchema: this.node().isJsonSchema });
  }

  addSubNode(node: XTreeData, type: XJsonSchemaType = 'string') {
    const addNode: XTreeData = {
      id: v4(),
      title: '',
      name: '',
      type: 'string',
      required: true,
      description: '',
      isArray: type === 'array'
    };

    if (type === 'array' && node.children) {
      for (let child of node.children) {
        this.tree().deleteNode(child);
      }
    }

    this.tree().addNode(addNode, node);
  }

  addAdjoinNode(node: XTreeData) {
    const addNode: XTreeData = {
      id: v4(),
      title: '',
      name: '',
      description: '',
      required: true,
      type: 'string'
    };

    const parentNode = this.getParentNode(node);

    if (parentNode && parentNode.children) {
      const index = parentNode.children.findIndex((x) => x === node);
      if (index === -1) return;

      this.tree().addNode(addNode, parentNode, index);
    }

    // if (parentNode && parentNode.properties) {
    //   const index = parentNode.properties.indexOf(originNode);
    //   parentNode.properties.splice(index + 1, 0, addNode);
    // }
    // this.schema.dataSource.setData(this.schema.data);
    // this.schema.treeControl.expand(node);
  }

  deleteChildren(node: XTreeData) {
    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        this.tree().deleteNode(child);
      }
    }
  }

  changeNodeValue(current: XJsonSchemaType, will: XJsonSchemaType, node: XTreeData) {
    if (
      (current === 'object' && will !== 'object') ||
      (current !== 'object' && will === 'object') ||
      (current === 'array' && will !== 'array') ||
      (current !== 'array' && will === 'array')
    ) {
      this.deleteChildren(node);
    }
    let keys: string[] = [];
    if (current === 'string') {
      keys = [
        'isEnum',
        'isConst',
        'format',
        'behavior',
        'minLength',
        'maxLength',
        'default',
        'pattern',
        'examples'
      ];
    } else if (current === 'integer' || current === 'number') {
      keys = [
        'isEnum',
        'isConst',
        'format',
        'behavior',
        'minimum',
        'maximum',
        'default',
        'multipleOf',
        'examples',
        'exclusiveMinimum',
        'exclusiveMaximum'
      ];
    } else if (current === 'boolean') {
      keys = ['behavior', 'default'];
    } else if (current === 'array') {
      keys = ['behavior', 'minItems', 'maxItems', 'uniqueItems'];
    } else if (current === 'object') {
      keys = ['behavior', 'minProperties', 'maxProperties', 'additionalProperties'];
    }
    this.deleteKeys(keys);
  }

  deleteKeys(keys: string[]) {
    this.node.update((x: any) => {
      for (let key of keys) {
        delete x[key];
      }
      return x;
    });
  }
}
