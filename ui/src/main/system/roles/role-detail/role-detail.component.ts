import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XFormComponent, XControl } from '@ng-nest/ui/form';
import { SettingService } from 'src/services/setting.service';
import { RolesService } from '../roles.service';
import { NavService } from 'src/services/nav.service';
import { OrganizationService, Organization } from '../../organization/organization.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailComponent implements OnInit {
  id!: string | null;
  type!: string | null;
  selected!: Organization;
  config = {
    labelWidth: '6rem'
  };
  controls: XControl[] = [
    { control: 'input', id: 'name', label: '角色名称', required: true },
    {
      control: 'find',
      id: 'organization',
      label: '组织机构',
      required: true,
      treeData: () => this.organization.getList(1, Number.MAX_SAFE_INTEGER).pipe(map((x) => x.list))
    },
    { control: 'input', id: 'id', hidden: true, value: this.setting.guid() }
  ];

  @ViewChild('form') form!: XFormComponent;

  get formInvalid() {
    return this.form?.formGroup?.invalid;
  }

  get disabled() {
    return this.type === 'info';
  }

  constructor(
    private service: RolesService,
    private organization: OrganizationService,
    private setting: SettingService,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private nav: NavService,
    private cdr: ChangeDetectorRef
  ) {
    this.activatedRoute.paramMap.subscribe((x: ParamMap) => {
      this.id = x.get('id');
      this.type = x.get('type');
      this.selected = {
        id: x.get('selectedId'),
        label: x.get('selectedLabel') as string
      };
      if (this.selected.id) {
        (this.controls.find((x) => x.id === 'organization') as XControl).value = this.selected;
      }
    });
  }

  ngOnInit() {
    this.action(this.type);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  action(type: string | null) {
    switch (type) {
      case 'info':
        this.service.get(this.id as string).subscribe((x) => {
          this.form.formGroup.patchValue(x);
        });
        break;
      case 'edit':
        this.action('info');
        break;
      case 'save':
        if (this.type === 'add') {
          this.service.post(this.setForm(this.form.formGroup.value)).subscribe(() => {
            this.message.success('新增成功！');
            this.nav.back(true);
          });
        } else if (this.type === 'edit') {
          this.service.put(this.setForm(this.form.formGroup.value)).subscribe(() => {
            this.message.success('修改成功！');
            this.nav.back(true);
          });
        }
        break;
      case 'cancel':
        this.nav.back();
        break;
    }
  }

  setForm(value: any) {
    this.setFind(value, 'organization');
    return value;
  }

  setFind(value: any, ...keys: string[]) {
    for (let key of keys) {
      let val = value[key];
      if (Array.isArray(val)) {
        value[key] = val.map((x) => ({ id: x.id, label: x.label }));
      } else {
        value[key] = { id: val.id, label: val.label };
      }
    }
    return value;
  }
}
