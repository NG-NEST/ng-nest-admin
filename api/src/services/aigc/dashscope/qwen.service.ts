import { BadRequestException, Injectable } from '@nestjs/common';
import { DASHSCOPE_GENERATION_URL } from './qwen.constants';
import { ConfigService } from '@nestjs/config';
import { QwenInput } from './qwen.input';
import { Observable } from 'rxjs';
import { spawn } from 'node:child_process';
import { AigcOutput } from '../aigc.output';
import { AigcStreamOutput } from '../aigc-stream.output';
import { QwenStreamInput } from './qwen-stream.input';

@Injectable()
export class QwenService {
  constructor(private config: ConfigService) {}

  async textGeneration(input: QwenInput): Promise<AigcOutput> {
    const { model, prompt } = input;
    const response = await fetch(DASHSCOPE_GENERATION_URL, {
      method: 'POST',
      headers: this.setHeader(),
      body: JSON.stringify({ model, input: { prompt } }),
    });

    const data = await response.json();

    if (response.ok) {
      const { output, usage, request_id } = data;
      return {
        finished: output.finish_reason === 'stop',
        text: output.text,
        inputTokens: usage.input_tokens,
        outputTokens: usage.output_tokens,
        requestId: request_id,
      };
    } else {
      throw new BadRequestException(data);
    }
  }

  textGenerationSubject(input: QwenStreamInput): Observable<AigcStreamOutput> {
    return new Observable((output) => {
      const { model, messages } = input;
      const data = {
        model,
        input: { messages },
        parameters: {
          result_format: 'text',
        },
      };

      const child = spawn('curl', [
        '-L',
        DASHSCOPE_GENERATION_URL,
        '-H',
        `Authorization: Bearer ${this.config.getOrThrow('DASHSCOPE_API_KEY')}`,
        '-H',
        'Content-Type: application/json',
        '-H',
        'X-DashScope-SSE: enable',
        '-d',
        JSON.stringify(data),
      ]);

      let surplus: Buffer = null;
      let start = 0;

      child.stdout.on('data', (buffer: Buffer) => {
        surplus = surplus ? Buffer.concat([surplus, buffer]) : buffer;
        const { analyzed, end } = this.matchBuffer(surplus, start);
        start = end + 1;

        output.next(analyzed);
      });
      child.on('close', () => {
        output.complete();
        child.kill();
      });
      child.on('error', (error) => {
        output.error(error);
        output.complete();
        child.kill();
      });
    });
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

  private matchBuffer(buffer: Buffer, start: number) {
    const str = buffer.toString();
    const list = str.split(/\n\n/);
    const data: AigcOutput[] = [];
    let end = start;
    for (let i = start; i < list.length; i++) {
      const item = list[i];
      const idMatch = item.match(/id:(\d+)/);
      const httpStatusMatch = item.match(/:HTTP_STATUS\/(\d+)/);
      const dataMatch = item.match(/data:(.*)$/m);
      const id = idMatch ? Number(idMatch[1]) : null;
      const httpStatus = httpStatusMatch ? Number(httpStatusMatch[1]) : null;
      const dataStr = dataMatch ? dataMatch[1] : null;
      try {
        const dataObj = dataStr ? JSON.parse(dataStr) : null;
        if (id && dataObj) {
          if (httpStatus === 200) {
            const { output, usage, request_id } = dataObj;
            data.push({
              finished: output.finish_reason === 'stop',
              index: id,
              text: output.text,
              inputTokens: usage.input_tokens,
              outputTokens: usage.output_tokens,
              requestId: request_id,
              status: httpStatus,
            });
          } else {
            const { code, message, request_id } = dataObj;
            data.push({
              status: httpStatus,
              error: true,
              message,
              requestId: request_id,
              code,
            });
          }

          end = i;
        }
      } catch {}
    }
    const analyzed = { data };

    return { analyzed, end };
  }
}
