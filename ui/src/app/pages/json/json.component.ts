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
  dialog = inject(XDialogService);
  formBuilder = inject(FormBuilder);

  form1 = this.formBuilder.group({});
  jsonSchema1: XJsonSchema = {
    type: 'array',
    title: '用户角色集合',
    items: {
      type: 'object',
      title: '用户角色',
      properties: {
        id: { type: 'string', title: '编码' },
        name: { type: 'string', title: '角色名称' }
      },
      required: ['id']
    }
  };

  form2 = this.formBuilder.group({});
  jsonSchema2: XJsonSchema = {
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
      roles: {
        type: 'array',
        title: '用户角色集合',
        items: {
          type: 'object',
          title: '用户角色',
          properties: {
            id: { type: 'string', title: '编码' },
            name: { type: 'string', title: '角色名称' },
          },
          required: ['id']
        }
      }
    },
    required: ['userId', 'userName', 'email']
  };

  ngAfterViewInit() {
    // this.dialog.create(SchemaDetailComponent, {
    //   width: '50rem',
    //   data: {
    //     saveSuccess: () => {}
    //   }
    // });
  }
}
