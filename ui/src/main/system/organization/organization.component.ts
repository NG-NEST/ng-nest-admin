import { Component, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { OrganizationService, Organization } from './organization.service';
import { map } from 'rxjs/operators';
import { XFormRow } from '@ng-nest/ui/form';
import { FormGroup } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { guid } from '@ng-nest/ui/core';
import { XTreeAction, XTreeComponent } from '@ng-nest/ui/tree';
import { XMessageBoxService, XMessageBoxAction } from '@ng-nest/ui/message-box';

/**
 * 组织管理
 *
 * @export
 * @class OrganizationComponent
 */
@Component({
  selector: 'app-organization',
  templateUrl: 'organization.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationComponent {
  @ViewChild('treeCom') treeCom: XTreeComponent;
  formGroup = new FormGroup({});

  get disabled() {
    return !['edit', 'add'].includes(this.type);
  }

  type = 'info';

  selected: Organization;

  activatedId: string;

  data = () => this.service.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list));

  actions: XTreeAction[] = [
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
        }
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
  constructor(private service: OrganizationService, private message: XMessageService, private msgBox: XMessageBoxService) {}

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
              this.service.delete(node.id).subscribe((x) => {
                this.treeCom.removeNode(node);
                this.formGroup.reset();
                this.message.success('删除成功！');
              });
          }
        });
        break;
      case 'save':
        if (this.type === 'add') {
          this.service.post(this.formGroup.value).subscribe((x) => {
            this.type = 'info';
            this.treeCom.addNode(x);
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.service.put(this.formGroup.value).subscribe((x) => {
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
