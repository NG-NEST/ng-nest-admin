import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { OrganizationService, Organization } from './organization.service';
import { map, tap } from 'rxjs/operators';
import { XFormRow } from '@ng-nest/ui/form';
import { FormGroup } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { guid } from '@ng-nest/ui/core';
import { XTreeAction, XTreeComponent } from '@ng-nest/ui/tree';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';
import { PageBase } from 'src/share/base/base-page';
import { IndexService } from 'src/layout/index/index.service';

@Component({
  selector: 'app-organization',
  templateUrl: 'organization.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationComponent extends PageBase {
  @ViewChild('treeCom') treeCom!: XTreeComponent;
  formGroup = new FormGroup({});

  get disabled() {
    return !['edit', 'add', 'add-root'].includes(this.type);
  }

  type = 'info';

  selected!: Organization;

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
      handler: (node: Organization) => {
        this.action('add', node);
      }
    },
    {
      id: 'edit',
      label: '修改',
      icon: 'fto-edit',
      handler: (node: Organization) => {
        this.action('edit', node);
      }
    },
    {
      id: 'delete',
      label: '删除',
      icon: 'fto-trash-2',
      handler: (node: Organization) => {
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
        {
          control: 'select',
          id: 'type',
          label: '类型',
          data: [
            { id: 'group', label: '事业部' },
            { id: 'subsidiary', label: '子公司' },
            { id: 'department', label: '部门' }
          ],
          value: 'department'
        },
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
    private service: OrganizationService,
    public override indexService: IndexService,
    private message: XMessageService,
    private msgBox: XMessageBoxService
  ) {
    super(indexService);
  }

  ngOnInit() {
    this.treeActions = this.treeActions.filter((x) => this.auth[x.id]);
  }

  action(type: string, node: Organization) {
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
          id: guid(),
          pid: node.id,
          type: 'department'
        });
        break;
      case 'add-root':
        this.type = type;
        this.formGroup.reset();
        this.formGroup.patchValue({
          id: guid(),
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
    }
  }
}
