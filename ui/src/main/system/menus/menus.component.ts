import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MenusService, Menu } from './menus.service';
import { map, tap } from 'rxjs/operators';
import { XFormRow } from '@ng-nest/ui/form';
import { UntypedFormGroup } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XGuid } from '@ng-nest/ui/core';
import { XTreeAction, XTreeComponent } from '@ng-nest/ui/tree';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { Router, ActivatedRoute } from '@angular/router';
import { PageBase } from 'src/share/base/base-page';
import { IndexService } from 'src/layout/index/index.service';

@Component({
  selector: 'app-menus',
  templateUrl: 'menus.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenusComponent extends PageBase {
  @ViewChild('treeCom') treeCom!: XTreeComponent;
  formGroup = new UntypedFormGroup({});

  get disabled() {
    return !['edit', 'add', 'add-root'].includes(this.type);
  }

  type = 'info';

  selected!: Menu;

  activatedId!: string;

  treeLoading = true;

  data = () =>
    this.service
      .getList(1, Number.MAX_SAFE_INTEGER, {
        sort: [
          { field: 'pid', value: 'asc' },
          { field: 'sort', value: 'asc' }
        ]
      })
      .pipe(
        tap(() => (this.treeLoading = false)),
        map((x) => x.list)
      );

  treeActions: XTreeAction[] = [
    {
      id: 'add',
      label: '新增',
      icon: 'fto-plus-square',
      handler: (node: Menu) => {
        this.action('add', node);
      }
    },
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: Menu) => {
        this.action('edit', node);
      }
    },
    {
      id: 'actions',
      label: '操作设置',
      icon: 'fto-list',
      handler: (node: Menu) => {
        this.action('actions', node);
      }
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: Menu) => {
        this.action('delete', node);
      }
    }
  ];

  controls: XFormRow[] = [
    {
      controls: [
        {
          control: 'input',
          id: 'label',
          label: '名称',
          required: true
        },
        { control: 'input', id: 'icon', label: '图标' },
        { control: 'input', id: 'router', label: '路由' },
        { control: 'input', id: 'sort', label: '顺序' }
      ]
    },
    {
      hidden: true,
      controls: [
        {
          control: 'input',
          id: 'id'
        },
        {
          control: 'input',
          id: 'pid'
        }
      ]
    }
  ];
  constructor(
    private service: MenusService,
    public override indexService: IndexService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {
    super(indexService);
  }

  ngOnInit() {
    this.treeActions = this.treeActions.filter((x) => this.auth[x.id]);
  }

  action(type: string, node: Menu) {
    switch (type) {
      case 'info':
        this.type = type;
        this.selected = node;
        this.service.get(node?.id).subscribe((x) => {
          this.formGroup.patchValue(x);
        });
        break;
      case 'add':
        this.type = type;
        this.selected = node;
        this.formGroup.reset();
        this.formGroup.patchValue({
          id: XGuid(),
          pid: node.id,
          type: 'department'
        });
        break;
      case 'add-root':
        this.type = type;
        this.formGroup.reset();
        this.formGroup.patchValue({
          id: XGuid(),
          pid: null,
          type: ''
        });
        break;
      case 'edit':
        this.type = type;
        this.service.get(node?.id).subscribe((x) => {
          this.formGroup.patchValue(x);
        });
        break;
      case 'delete':
        this.msgBox.confirm({
          title: '提示',
          content: `此操作将永久删除此条数据：${node.label}，是否继续？`,
          type: 'warning',
          callback: (action: XMessageBoxAction) => {
            action === 'confirm' &&
              this.service.delete(node.id).subscribe(() => {
                this.treeCom.removeNode(node);
                this.formGroup.reset();
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'save':
        if (this.type === 'add' || this.type === 'add-root') {
          this.service.post(this.formGroup.value).subscribe((x) => {
            this.type = 'info';
            this.treeCom.addNode(x);
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.service.put(this.formGroup.value).subscribe(() => {
            this.type = 'info';
            this.treeCom.updateNode(node, this.formGroup.value);
            this.message.success('修改成功！');
          });
        }
        break;
      case 'cancel':
        this.type = 'info';
        this.formGroup.reset();
        break;
      case 'actions':
        this.router.navigate([`./actions/${node.id}`], { relativeTo: this.activatedRoute });
        break;
    }
  }
}
