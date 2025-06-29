import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { SchemaDetailComponent } from '../schema/schema-detail/schema-detail.component';
import { XDialogService } from '@ng-nest/ui/dialog';
import { AppJsonSchemaComponent, AppSchemaFormComponent, XJsonSchema } from '@ui/core';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
  imports: [AppJsonSchemaComponent, AppSchemaFormComponent]
})
export class JsonComponent {
  jsonSchema: XJsonSchema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: '用户信息',
    type: 'object',
    properties: {
      userId: {
        title: '用户ID',
        description: '用户的唯一标识符',
        type: 'string'
      },
      userName: {
        title: '用户名',
        description: '用户的登录名或昵称',
        type: 'string'
      },
      email: {
        title: '电子邮件',
        description: '用户的电子邮箱地址',
        type: 'string',
        format: 'email'
      },
      phoneNumber: {
        title: '电话号码',
        description: '用户的联系电话号码',
        type: 'string'
      },
      fullName: {
        title: '全名',
        description: '用户的完整姓名',
        type: 'string'
      },
      gender: {
        title: '性别',
        description: '用户的性别',
        type: 'string',
        enum: ['男', '女', '其他']
      },
      dateOfBirth: {
        title: '出生日期',
        description: '用户的出生年月日',
        type: 'string',
        format: 'date'
      },
      address: {
        title: '地址',
        description: '用户的居住地址',
        type: 'string'
      },
      city: {
        title: '城市',
        description: '用户所在城市',
        type: 'string'
      },
      province: {
        title: '省份',
        description: '用户所在省份',
        type: 'string'
      },
      country: {
        title: '国家',
        description: '用户所在国家',
        type: 'string'
      },
      postalCode: {
        title: '邮政编码',
        description: '用户的邮政编码',
        type: 'string'
      },
      createdAt: {
        title: '创建时间',
        description: '用户账户创建时间',
        type: 'string',
        format: 'date-time'
      },
      updatedAt: {
        title: '更新时间',
        description: '用户信息最后更新时间',
        type: 'string',
        format: 'date-time'
      }
    },
    required: ['userId', 'userName', 'email']
  };
  dialog = inject(XDialogService);

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({});

  ngAfterViewInit() {
    // this.dialog.create(SchemaDetailComponent, {
    //   width: '50rem',
    //   data: {
    //     saveSuccess: () => {}
    //   }
    // });
  }
}
