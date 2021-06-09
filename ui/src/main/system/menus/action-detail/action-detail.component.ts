import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XFormComponent, XControl } from '@ng-nest/ui/form';
import { SettingService } from 'src/services/setting.service';
import { ActionsService, Menu } from '../menus.service';
import { NavService } from 'src/services/nav.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { XMessageService } from '@ng-nest/ui/message';

@Component({
  selector: 'app-action-detail',
  templateUrl: './action-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionDetailComponent implements OnInit {
  id!: string | null;
  type!: string | null;
  menuId!: string | null;
  controls: XControl[] = [
    { control: 'input', id: 'name', label: '名称', required: true },
    { control: 'input', id: 'code', label: '编码', required: true },
    { control: 'input', id: 'icon', label: '图标' },
    { control: 'input', id: 'sort', label: '顺序' },
    { control: 'input', id: 'id', hidden: true, value: this.setting.guid() },
    { control: 'input', id: 'menuId', hidden: true }
  ];

  @ViewChild('form') form!: XFormComponent;

  get formInvalid() {
    return this.form?.formGroup?.invalid;
  }

  get disabled() {
    return this.type === 'info';
  }

  constructor(
    private service: ActionsService,
    private setting: SettingService,
    private activatedRoute: ActivatedRoute,
    private message: XMessageService,
    private nav: NavService,
    private cdr: ChangeDetectorRef
  ) {
    this.activatedRoute.paramMap.subscribe((x: ParamMap) => {
      console.log(x);
      this.id = x.get('id');
      this.type = x.get('type');
      this.menuId = x.get('menuId');
      if (this.menuId) {
        (this.controls.find((x) => x.id === 'menuId') as XControl).value = this.menuId;
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
          this.service.post(this.setForm(this.form.formGroup.value)).subscribe((x) => {
            this.message.success('新增成功！');
            this.nav.back(true);
          });
        } else if (this.type === 'edit') {
          this.service.put(this.setForm(this.form.formGroup.value)).subscribe((x) => {
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
    return value;
  }
}
