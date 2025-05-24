import { Component, inject } from '@angular/core';
import { SchemaDetailComponent } from '../schema/schema-detail/schema-detail.component';
import { XDialogService } from '@ng-nest/ui/dialog';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent {
  dialog = inject(XDialogService);

  ngAfterViewInit() {
    this.dialog.create(SchemaDetailComponent, {
      width: '50rem',
      data: {
        saveSuccess: () => {}
      }
    });
  }
}
