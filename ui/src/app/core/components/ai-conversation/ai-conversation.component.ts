import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  input,
  model,
  Renderer2,
  signal,
  viewChild
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OpenAIService } from '@ui/api';
import { XBubbleComponent, XBubblesComponent } from '@ng-nest/ui/bubble';
import { XSenderComponent } from '@ng-nest/ui/sender';
import { NgTemplateOutlet } from '@angular/common';
import { XButtonComponent } from '@ng-nest/ui/button';
import { debounceTime, finalize, Subject, takeUntil, tap } from 'rxjs';
import { micromark } from 'micromark';
import { XResize, XResizeObserver } from '@ng-nest/ui/core';
import { XScrollableComponent } from '@ng-nest/ui/scrollable';
import { v4 } from 'uuid';
import { XListComponent, XListNode } from '@ng-nest/ui/list';
import { XI18nPipe, XI18nService } from '@ng-nest/ui';

@Component({
  selector: 'ai-conversation',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    XBubbleComponent,
    XBubblesComponent,
    XSenderComponent,
    XButtonComponent,
    XScrollableComponent,
    XListComponent,
    XI18nPipe,
    NgTemplateOutlet
  ],
  templateUrl: './ai-conversation.component.html',
  styleUrls: ['./ai-conversation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AiConversationComponent {
  formBuilder = inject(FormBuilder);
  openaiService = inject(OpenAIService);
  renderer = inject(Renderer2);
  cdr = inject(ChangeDetectorRef);
  i18n = inject(XI18nService);

  contentRef = viewChild<ElementRef<HTMLDivElement>>('contentRef');
  footerRef = viewChild<ElementRef<HTMLDivElement>>('footerRef');

  type = input<'test' | 'signal' | 'multiple'>('multiple');

  platform = input<string>();
  model = input<string>();
  prompt = model<string>();
  system = input<string>();
  messages = model<{ role: string; content: string }[]>([]);

  temperature = input<number>();
  maxTokens = input<number>();
  topP = input<number>();
  frequencyPenalty = input<number>();
  presencePenalty = input<number>();

  loading = signal(false);

  sendLoading = signal(false);
  sendContent = signal(this.i18n.translate('$ai.defaultPrompt'));

  testResult = signal<{ role: string; content: string }[]>([]);
  testContent = signal('');
  testLoading = signal(false);
  testTyping = signal(false);

  private unSubject = new Subject<void>();
  private resizeObserver!: XResizeObserver;

  list = signal<XListNode[]>([]);
  currentId = signal(v4());

  render = (value: string) => micromark(value);

  ngAfterViewInit() {
    if (!this.contentRef() || !this.footerRef()) return;
    XResize(this.footerRef()!.nativeElement)
      .pipe(
        debounceTime(20),
        tap(({ resizeObserver }) => {
          this.resizeObserver = resizeObserver;
          this.renderer.setStyle(
            this.contentRef()!.nativeElement,
            'padding-bottom',
            `${this.footerRef()!.nativeElement.clientHeight}px`
          );
        }),
        takeUntil(this.unSubject)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unSubject.next();
    this.unSubject.complete();
    this.resizeObserver?.disconnect();
  }

  onSubmit() {
    if (!this.sendContent() || this.sendLoading()) return;

    const item = this.list().find((x) => x.id === this.currentId);
    if (!item) {
      this.list.update((x) => {
        x.unshift({ id: this.currentId(), label: this.sendContent() });
        return [...x];
      });

      this.cdr.detectChanges();
    }

    this.sendLoading.set(true);
    const systemMessage = { role: 'system', content: '' };
    if (this.system()) {
      systemMessage.content = this.system()!;
    }
    const userMessage = { role: 'user', content: this.sendContent() };

    // 将用户消息添加到消息列表中
    this.messages.update((x) => {
      if (systemMessage.content) {
        x.push(systemMessage);
      }
      x.push(userMessage);
      return x;
    });

    // 调用 sendMessage 发送消息
    this.sendMessage()
      .pipe(
        finalize(() => {
          this.sendLoading.set(false);
          this.sendContent.set(''); // 清空输入框
        })
      )
      .subscribe({
        next: (x) => {
          const { status } = x;
          if (status === 'processing') {
            // 开始处理时，初始化 assistant 消息
            this.messages.update((messages) => {
              messages.push({ role: 'assistant', content: '' });
              return messages;
            });
          } else if (status === 'streaming') {
            // 流式接收数据时，更新最后一条 assistant 消息
            const currentMessages = this.messages() || [];
            if (currentMessages.length > 0) {
              const lastMessage = currentMessages[currentMessages.length - 1];
              if (lastMessage.role === 'assistant') {
                lastMessage.content = lastMessage.content + (x.content || '');
                this.cdr.markForCheck();
              }
            }
          } else if (status === 'completed') {
            // 完成处理
            console.log('Message sending completed');
          }
        },
        error: (e) => {
          // 处理错误情况
          console.error('Error sending message:', e);
          // 可以在消息列表中添加错误提示
          const currentMessages = this.messages() || [];
          this.messages.set([...currentMessages, { role: 'error', content: '发送消息时出现错误' }]);
        }
      });
  }

  sendMessage() {
    return this.openaiService.postSse({
      platform: this.platform(),
      model: this.model(),
      prompt: this.prompt(),
      messages: this.messages(),
      system: this.system(),
      temperature: this.temperature(),
      maxTokens: this.maxTokens(),
      topP: this.topP(),
      presencePenalty: this.presencePenalty(),
      frequencyPenalty: this.frequencyPenalty()
    });
  }

  testOpenAI() {
    debugger;
    if (
      this.testLoading() ||
      this.testTyping() ||
      !this.platform() ||
      !this.prompt() ||
      !this.model()
    )
      return;

    this.testContent.set('');
    this.testLoading.set(true);
    this.sendMessage()
      .pipe(
        finalize(() => {
          this.testLoading.set(false);
          this.testTyping.set(false);
        })
      )
      .subscribe({
        next: (x) => {
          const { status } = x;
          if (status === 'processing') {
            this.testLoading.set(false);
            this.testTyping.set(true);
          } else if (status === 'streaming') {
            this.testContent.update((content) => {
              content += x.content!;
              return content;
            });
          } else if (status === 'completed') {
            this.testTyping.set(false);
          }
        },
        error: (e) => {
          this.testResult.set(e.message);
        }
      });
  }
}
