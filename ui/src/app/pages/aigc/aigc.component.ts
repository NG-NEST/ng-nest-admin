import { Component, OnDestroy, OnInit, Renderer2, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XMessageService } from '@ng-nest/ui/message';
import { XButtonComponent } from '@ng-nest/ui/button';
import { AuthService } from '@ui/api';
import { AppAuthService, AppPrismService } from '@ui/core';
import { XStorageService } from '@ng-nest/ui/core';
import { Router } from '@angular/router';
import { XI18nPipe, XI18nService } from '@ng-nest/ui/i18n';
import { XTextareaComponent } from '@ng-nest/ui/textarea';
import { Socket, io } from 'socket.io-client';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { XIconComponent } from '@ng-nest/ui/icon';
import Prism from 'prismjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { XSliderComponent } from '@ng-nest/ui/slider';
import { XSelectComponent } from '@ng-nest/ui/select';
import { JsonPipe } from '@angular/common';

export const flyInBottom = [
  trigger('flyInBottom', [
    transition('void => *', [
      style({ transform: 'translateY(40%)', opacity: 0 }),
      animate('100ms cubic-bezier(0, 0, 0.1, 1)', style({ transform: '*', opacity: 1 }))
    ])
  ])
];

@Component({
  selector: 'app-aigc',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    XTextareaComponent,
    XButtonComponent,
    XIconComponent,
    XSliderComponent,
    XSelectComponent,
    XI18nPipe
  ],
  templateUrl: './aigc.component.html',
  styleUrls: ['./aigc.component.scss'],
  animations: [flyInBottom]
})
export class AigcComponent implements OnInit, OnDestroy {
  auth = inject(AppAuthService);
  authService = inject(AuthService);
  message = inject(XMessageService);
  storage = inject(XStorageService);
  i18n = inject(XI18nService);
  fb = inject(FormBuilder);
  renderer = inject(Renderer2);
  domSanitizer = inject(DomSanitizer);
  ps = inject(AppPrismService);
  router = inject(Router);
  isLoading = signal(false);

  source = [
    {
      name: 'Gemini',
      type: 'gemini',
      models: ['gemini-pro']
    },
    {
      name: '通义千问',
      type: 'qwen',
      models: ['qwen-1.8b-chat']
    },
    {
      name: '文心一言',
      type: 'qianfan',
      models: ['ERNIE-3.5-8K']
    }
  ];

  activeSource = signal(this.source[0]);
  activeModel = signal(this.activeSource().models[0]);

  slideData = this.source.map((x) => ({ label: x.name, id: x.type, data: x }));

  form!: FormGroup;

  socket!: Socket | null;
  list: { role: string; content: string }[] = [];
  contentList = signal<{ role: string; content: SafeHtml }[]>([]);
  marked = new Marked(
    {
      gfm: true,
      breaks: true
    },
    markedHighlight({
      langPrefix: 'language-',
      highlight: (code, lang) => {
        if (Prism.languages[lang]) {
          return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
      }
    })
  );

  ngOnInit() {
    this.form = this.fb.group({ content: [''] });
    this.createSocket();
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  sourceChange(source: any) {
    this.activeSource.set(source.data);
    this.activeModel.set(this.activeSource().models[0]);
    this.createSocket();
  }

  modelChange() {
    this.createSocket();
  }

  createSocket() {
    this.destroySocket();

    const { type } = this.activeSource();
    const model = this.activeModel();
    this.socket = io('ws://127.0.0.1:3010', {
      path: '/aigc',
      query: { type, model },
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${this.auth.accessToken()}`
          }
        }
      }
    });

    this.socket.on('connect', () => {
      console.log('connected');
    });
    this.socket.on('text-generation', (x) => {
      if (x && x.data) {
        const last = this.list[this.list.length - 1];
        let isFinished = false;
        for (let item of x.data) {
          let { text, finished, error, message } = item;
          if (error) {
            isFinished = true;
            text = message;
          }
          isFinished = finished;
          last.content += text;
        }
        const lastItem = this.contentList()[this.contentList().length - 1];
        let md = this.marked.parse(last.content) as string;
        if (!isFinished) md = this.addCursor(md);
        lastItem.content = this.domSanitizer.bypassSecurityTrustHtml(md);
        this.isLoading.set(!isFinished);
      }
    });
    this.socket.on('error', (data: any) => {
      console.log(data);
    });
    this.socket.on('disconnect', () => {
      console.log('disconnect');
    });
  }

  destroySocket() {
    this.socket?.disconnect();
    this.socket = null;
  }

  submit() {
    const { content } = this.form.value;
    if (content && this.socket && this.socket.connected && !this.isLoading()) {
      const item = {
        role: 'user',
        content
      };
      this.list.push(item);
      this.contentList().push(item, {
        role: 'assistant',
        content: this.domSanitizer.bypassSecurityTrustHtml(this.createCursor().outerHTML)
      });
      this.isLoading.set(true);
      this.socket.emit('text-generation', this.list);
      this.list.push({ role: 'assistant', content: '' });

      this.form.patchValue({ content: '' });
    }
  }

  createCursor() {
    const cursor = this.renderer.createElement('span') as HTMLElement;
    this.renderer.addClass(cursor, 'cursor');
    cursor.innerHTML = '|';
    return cursor;
  }

  addCursor(md: string) {
    let div = this.renderer.createElement('div') as Element;
    div.innerHTML = md;

    let ele = div.lastChild!;
    let findEle: ChildNode | null = null;

    if (ele instanceof Text) {
      findEle = div.lastElementChild!;
    }

    while (!(ele instanceof Text) && ele.childNodes.length > 0) {
      const next = ele.lastChild!;
      if (next instanceof Text) {
        if (next.data.endsWith('\n')) {
          next.data = next.data.slice(0, next.data.length - 2);
        }
        findEle = ele;
      }
      ele = next;
    }
    if (findEle) {
      this.renderer.appendChild(findEle, this.createCursor());
    }

    return div.innerHTML;
  }
}
