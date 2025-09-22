import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { AppAuthService } from '@ui/core';

export interface OpenAIInput {
  // 使用接口平台
  platform?: string;

  // 消息内容，支持多种格式
  messages?: { role: string; content: string }[];
  prompt?: string;
  system?: string;

  // 模型配置参数
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;

  // 其他可选参数
  [key: string]: any; // 允许其他自定义属性
}

export interface OpenAIOutput {
  platform?: string;
  model?: string;
  status: 'processing' | 'streaming' | 'completed' | 'error';
  content?: string;
  message?: string;
  id?: string | number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private readonly apiUrl = '/api/openai';

  constructor(private authService: AppAuthService) {}

  /**
   * 发送 POST 请求并接收 SSE 流
   * @param data 请求体
   * @returns Observable<OpenAIOutput>
   */
  postSse(data: OpenAIInput): Observable<OpenAIOutput> {
    const subject = new Subject<OpenAIOutput>();

    fetchEventSource(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authService.accessToken()}`
      },
      body: JSON.stringify(data),
      onmessage: (message: EventSourceMessage) => {
        try {
          const data = JSON.parse(message.data);
          subject.next(data);
        } catch (e) {
          console.log(e);
        }
      },
      onclose: () => {
        subject.complete();
      },
      onerror: (err: any) => {
        subject.error(err);
      }
    });

    return subject.asObservable();
  }
}
