import { Component, inject, signal } from '@angular/core';
import { XI18nService } from '@ng-nest/ui';
import { AiConversationComponent } from '@ui/core';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
  imports: [AiConversationComponent]
})
export class JsonComponent {
  i18n = inject(XI18nService);
  platform = signal('dashscope');
  model = signal('qwen3-235b-a22b-instruct-2507');
  system = signal(this.i18n.translate('$json.system'));
  prompt = signal(this.i18n.translate('$json.prompt'));
}
