import { BadRequestException, Injectable } from '@nestjs/common';
import { TEXT_GENERATION_URL } from './qwen.constants';
import { ConfigService } from '@nestjs/config';
import { QwenInput } from './qwen.input';

@Injectable()
export class QwenService {
  constructor(private config: ConfigService) {}

  async textGeneration(input: QwenInput) {
    const { model, prompt } = input;
    const response = await fetch(TEXT_GENERATION_URL, {
      method: 'POST',
      headers: this.setHeader(),
      body: JSON.stringify({ model, input: { prompt } }),
    });

    const data = await response.json();

    if (response.ok) {
      return data.output.text;
    } else {
      throw new BadRequestException(data);
    }
  }

  private setHeader(sse = false): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.config.getOrThrow('DASHSCOPE_API_KEY')}`);
    if (sse) {
      headers.append('Accept', 'text/event-stream');
    }
    return headers;
  }
}
