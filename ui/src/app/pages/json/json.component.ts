import { Component } from '@angular/core';
import { AppJsonSchemaComponent, XJsonSchema } from '@ui/core';

@Component({
  selector: 'app-json',
  imports: [AppJsonSchemaComponent],
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent {
  data: XJsonSchema = {
    $id: 'xx.xxsa.asdaw123',
    title: 'xxxx',
    description: 'yyyy',
    type: 'object',
    properties: {
      xxxx: {
        $id: 'xx.xxsa.3322123',
        type: 'string'
      },
      yyyy: {
        type: 'integer'
      },
      zzzz: {
        type: 'boolean'
      },
      hhhh: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      gggg: {
        type: 'object',
        properties: {
          bbgb: {
            type: 'string'
          },
          bgbg: {
            type: 'string'
          }
        },
        required: ['bbgb', 'bgbg']
      }
    },
    required: ['xxxx', 'yyyy', 'zzzz', 'hhhh']
  };
}
