import { BadRequestException, Injectable } from '@nestjs/common';
import { GEMINI_GENERATION_URL } from './gemini.constants';
import { ConfigService } from '@nestjs/config';
import { GeminiInput } from './gemini.input';
import { Observable } from 'rxjs';
import { AigcStreamOutput } from '../aigc-stream.output';
import { spawn } from 'child_process';
import { GeminiStreamInput } from './gemini-stream.input';
import { AigcOutput } from '../aigc.output';
import { AigcStreamInput } from '../aigc-stream.input';
import { GeminiRole } from './gemini.enum';

@Injectable()
export class GeminiService {
  constructor(private config: ConfigService) {}

  async textGeneration(input: GeminiInput) {
    const { model, prompt } = input;
    const response = await fetch(`${GEMINI_GENERATION_URL}/${model}:generateContent`, {
      method: 'POST',
      headers: this.setHeader(),
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new BadRequestException(data);
    }
  }

  textGenerationSubject(input: AigcStreamInput): Observable<AigcStreamOutput> {
    return new Observable((output) => {
      const { model } = input;
      const data = this.dataConvert(input);
      if (false) {
        this.getTokens(input);
      }

      const child = spawn('curl', [
        '--proxy',
        'http://127.0.0.1:10080',
        `${GEMINI_GENERATION_URL}/${model}:streamGenerateContent?alt=sse&key=${this.config.getOrThrow('GEMINI_API_KEY')}`,
        '-H',
        'Content-Type: application/json',
        '--no-buffer',
        '-X',
        'POST',
        '-d',
        JSON.stringify(data),
      ]);

      let surplus: Buffer = null;
      let start = 0;

      child.stdout.on('data', (buffer: Buffer) => {
        surplus = surplus ? Buffer.concat([surplus, buffer]) : buffer;
        const { analyzed, end } = this.matchBuffer(surplus, start);
        start = end + 1;

        if (analyzed.length > 0) {
          const last = analyzed[analyzed.length - 1];
          last.text = analyzed.map((x) => x.text).join('');
          output.next({ data: [last] });
        }
      });
      child.on('close', () => {
        output.next({ data: [{ finished: true, text: '', index: start + 1, status: 200 }] });
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

  private dataConvert(input: AigcStreamInput): GeminiStreamInput {
    return {
      contents: input.messages.map((message) => {
        return {
          role: message.role === 'user' ? GeminiRole.User : GeminiRole.Model,
          parts: [
            {
              text: message.content,
            },
          ],
        };
      }),
    };
  }

  private setHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-goog-api-key', this.config.getOrThrow('GEMINI_API_KEY'));
    return headers;
  }

  private matchBuffer(buffer: Buffer, start: number) {
    let str = buffer.toString();
    const list = str.split(/\r\n\r\n/);
    const data: AigcOutput[] = [];
    let end = start;
    for (let i = start; i < list.length; i++) {
      const item = list[i];
      const dataMatch = item.match(/data:(.*)$/m);
      const dataStr = dataMatch ? dataMatch[1] : null;
      try {
        const dataObj = dataStr ? JSON.parse(dataStr) : null;
        if (dataObj) {
          const { text } = dataObj.candidates[0].content.parts[0];
          data.push({
            finished: false,
            index: i,
            text: text,
            status: 200,
          });

          end = i;
        }
      } catch {}
    }
    const analyzed = data;

    return { analyzed, end };
  }

  private async getTokens(input: AigcStreamInput) {
    const { model } = input;
    const contents = this.dataConvert(input);
    const response = await fetch(`${GEMINI_GENERATION_URL}/${model}:countTokens`, {
      method: 'POST',
      headers: this.setHeader(),
      body: JSON.stringify(contents),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new BadRequestException(data);
    }
  }
}
