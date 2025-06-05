import { Component, inject } from '@angular/core';
// import { SchemaDetailComponent } from '../schema/schema-detail/schema-detail.component';
import { XDialogService } from '@ng-nest/ui/dialog';
import { AppJsonSchemaComponent, XJsonSchema } from '@ui/core';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
  imports: [AppJsonSchemaComponent]
})
export class JsonComponent {
  jsonSchema: XJsonSchema = {
    title: '',
    description: '',
    type: 'object',
    properties: {}
  };
  dialog = inject(XDialogService);

  ngAfterViewInit() {
    // this.dialog.create(SchemaDetailComponent, {
    //   width: '50rem',
    //   data: {
    //     saveSuccess: () => {}
    //   }
    // });
  }
}
