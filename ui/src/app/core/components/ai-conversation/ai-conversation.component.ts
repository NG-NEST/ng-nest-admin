import { Component, computed, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { OpenAIService } from '@ui/api';
import { XBubbleComponent, XBubblesComponent } from '@ng-nest/ui/bubble';
import { XSenderComponent } from '@ng-nest/ui/sender';

@Component({
  selector: 'ai-conversation',
  imports: [ReactiveFormsModule, XBubbleComponent, XBubblesComponent, XSenderComponent],
  templateUrl: './ai-conversation.component.html',
  styleUrls: ['./ai-conversation.component.scss']
})
export class AiConversationComponent {
  formBuilder = inject(FormBuilder);
  openaiService = inject(OpenAIService);

  type = input<'test' | 'signal' | 'multi-turn'>('test');

  platform = input<string>();
  model = input<string>();
  prompt = input<string>();
  system = input<string>();
  messages = input<{ role: string; content: string }[]>();

  temperature = input<number>();
  maxTokens = input<number>();
  topP = input<number>();
  frequencyPenalty = input<number>();
  presencePenalty = input<number>();

  loading = signal(false);
  testResult = signal<{ role: string; content: string }[]>([]);

  list = computed(() => {
    if (this.type() === 'test') return this.testResult();
    if (this.messages()) {
      return this.messages();
    }
    return [];
  });

  ngAfterViewInit() {
    this.testOpenAI();
  }

  testOpenAI() {
    if (!this.platform() || !this.prompt() || !this.model()) return;
    this.openaiService
      .postSse({
        platform: this.platform(),
        model: this.model(),
        prompt: this.prompt(),
        system: this.system(),
        temperature: this.temperature(),
        maxTokens: this.maxTokens(),
        topP: this.topP(),
        presencePenalty: this.presencePenalty(),
        frequencyPenalty: this.frequencyPenalty()
      })
      .subscribe((x) => {
        console.log(x);
      });
  }
}
