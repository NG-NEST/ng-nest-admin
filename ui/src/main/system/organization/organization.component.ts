import { Component } from '@angular/core';
import { OrganizationService, Organization } from './organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { XFormRow } from '@ng-nest/ui/form';
import { FormGroup } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { SettingService } from 'src/services/setting.service';

/**
 * 组织管理
 *
 * @export
 * @class OrganizationComponent
 */
@Component({
  selector: 'app-organization',
  templateUrl: 'organization.component.html'
})
export class OrganizationComponent {
  formGroup = new FormGroup({});

  // get disabled() {
  //   return !['edit', 'add'].includes(this.type);
  // }

  type = 'info';

  disabled = false;

  selected: Organization;

  data = () => this.service.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list));

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

  constructor(public service: OrganizationService, public message: XMessageService, public setting: SettingService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.disabled = true;
  }

  action(type: string, node: Organization) {
    switch (type) {
      case 'get':
        this.selected = node;
        this.service.get(node?.id).subscribe((x) => this.formGroup.patchValue(x));
        break;
      case 'add':
        this.disabled = false;
        this.type = type;
        this.formGroup.reset();
        this.formGroup.patchValue({
          id: this.setting.guid(),
          pid: node.id,
          type: 'department'
        });
        break;
      case 'edit':
        this.disabled = false;
        this.type = type;
        this.action('get', node);
        break;
      case 'delete':
        this.service.delete(node.id).subscribe((x) => {
          this.message.success('删除成功！');
        });
        break;
      case 'save':
        if (this.type === 'add') {
          this.service.post(this.formGroup.value).subscribe((x) => {
            this.type = 'info';
            this.message.success('新增成功！');
          });
        } else if (this.type === 'edit') {
          this.service.put(this.formGroup.value).subscribe((x) => {
            debugger;
            this.type = 'info';
            Object.assign(node, this.formGroup.value);
            node.change && node.change();
            this.message.success('修改成功！');
          });
        }
        break;
      case 'cancel':
        break;
    }
  }
}
