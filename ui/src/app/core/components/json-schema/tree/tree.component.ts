import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  model,
  signal,
  SimpleChanges,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { CdkTree, CdkTreeModule } from '@angular/cdk/tree';
import { XIconComponent } from '@ng-nest/ui/icon';
import { CommonModule } from '@angular/common';
import { AppJsonSchemaComponent } from '../json-schema.component';
import { AppJsonSchemaService } from '../json-schema.service';
import { XTreeData } from '../json-schema.type';
import { XIsChange } from '@ng-nest/ui/core';

function flattenNodes(nodes: XTreeData[]): XTreeData[] {
  const flattenedNodes = [];
  for (const node of nodes) {
    flattenedNodes.push(node);
    if (node.children) {
      flattenedNodes.push(...flattenNodes(node.children));
    }
  }
  return flattenedNodes;
}

@Component({
  selector: 'app-tree',
  imports: [CdkTreeModule, CommonModule, XIconComponent],
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class AppTreeComponent implements AfterViewInit {
  tree = viewChild.required<CdkTree<XTreeData>>('tree');

  data = model.required<XTreeData[]>();
  nodeTpl = input.required<TemplateRef<any>>();
  extendLevel = input<number>(1);

  cdr = inject(ChangeDetectorRef);
  viewContainerRef = inject(ViewContainerRef);
  schema = inject(AppJsonSchemaComponent, { optional: true, host: true })!;
  jss = inject(AppJsonSchemaService);

  treeTrackBy = (_index: number, dataNode: XTreeData) => dataNode;

  childrenAccessor = (dataNode: XTreeData) => [...(dataNode.children ?? [])];

  dataSource = computed(() => {
    this.dataChanged();
    return [...this.data()];
  });

  dataChanged = signal(false);

  hasChild = (_: number, node: XTreeData) => !!node.children?.length;

  ngAfterViewInit() {
    if (this.extendLevel()) this.treeExtendLevel(this.extendLevel());
  }

  ngOnChanges(changes: SimpleChanges) {
    const { data } = changes;
    XIsChange(data) && this.treeExtendLevel(this.extendLevel());
  }

  getParentNode(node: XTreeData) {
    for (const parent of flattenNodes(this.data())) {
      if (parent.children?.includes(node)) {
        return parent;
      }
    }

    return null;
  }

  shouldRender(node: XTreeData) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!this.tree().isExpanded(parent)) {
        return false;
      }
      parent = this.getParentNode(parent);
    }

    return true;
  }

  deleteNode(node: XTreeData) {
    let parent = this.getParentNode(node);
    let children = node.children ? flattenNodes(node.children) : [];
    if (!parent) return;
    parent.children = parent.children!.filter((child) => child !== node);

    let removeFormNodes = [node, ...children];

    for (let form of removeFormNodes) {
      this.schema?.treeArrayForm.removeAt(
        this.schema?.treeArrayForm.getRawValue().findIndex((x: XTreeData) => x.id === form.id)
      );
    }

    this.dataChanged.update((x) => !x);
  }

  addNode(node: XTreeData, parentNode?: XTreeData, index = -1) {
    if (parentNode) {
      if (!parentNode.children) parentNode.children = [];
      if (index >= 0) {
        parentNode.children.splice(index + 1, 0, node);
      } else {
        parentNode.children.push(node);
      }
    } else {
      if (index >= 0) {
        this.data.update((x) => {
          const newData = [...x];
          newData.splice(index + 1, 0, node);
          return newData;
        });
      } else {
        this.data.update((x) => [...x, node]);
      }
    }
    this.dataChanged.update((x) => !x);

    this.schema?.treeArrayForm.push(this.jss.createNodeForm(node));
    this.tree().renderNodeChanges(this.dataSource());

    if (parentNode) {
      const isExpanded = this.tree().isExpanded(parentNode);
      if (!isExpanded) this.tree().toggle(parentNode);
    }
  }

  treeExtendLevel(level: number) {
    const extendNode = (node: XTreeData) => {
      if (!this.tree().isExpanded(node)) {
        this.tree().expand(node);
      }
    };
    setTimeout(() => {
      for (let i = 0; i < this.data().length; i++) {
        if (i < level) {
          extendNode(this.data()[i]);
        }
      }
    }, 100);
  }
}
