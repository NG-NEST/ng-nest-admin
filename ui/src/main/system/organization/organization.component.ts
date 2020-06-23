import { Component } from '@angular/core';
import { OrganizationService, Organization } from './organization.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { XControl } from '@ng-nest/ui/form';
import { FormGroup } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';

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

  data = () => this.service.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list));

  controls: XControl[] = [
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
  ];

  constructor(
    public service: OrganizationService,
    public message: XMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {}

  action(type: string, node?: Organization) {
    switch (type) {
      case 'get':
        this.service.get(node?.id).subscribe((x) => this.formGroup.patchValue(x));
        break;
      case 'add':
        break;
      case 'save':
        this.service.post(this.formGroup.value).subscribe((x) => this.message.success('保存成功！'));
        break;
      case 'cancel':
        break;
    }
  }
}
