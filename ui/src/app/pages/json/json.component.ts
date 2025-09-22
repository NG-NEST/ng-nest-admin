import { Component, signal } from '@angular/core';
import { AiConversationComponent } from '@ui/core';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss'],
  imports: [AiConversationComponent]
})
export class JsonComponent {
  platform = signal('dashscope');
  model = signal('qwen3-235b-a22b-instruct-2507');
  system = signal(
    '你是一个 AI 助手，请按照要求回答问题，使用markdown的格式逐条输出，带上 emoji 符号，控制在100字以内。'
  );
  prompt = signal('人工智能到底是什么？');
}
