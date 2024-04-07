import { BadRequestException, Injectable } from '@nestjs/common';
import { QIANFAN_URL } from './qianfan.constants';
import { ConfigService } from '@nestjs/config';
import { QianFanInput } from './qianfan.input';
import { AigcOutput } from '../aigc.output';
import { QianFanStreamInput } from './qianfan-stream.input';
import { Observable } from 'rxjs';
import { AigcStreamOutput } from '../aigc-stream.output';
import { spawn } from 'node:child_process';
import { RedisService } from '@api/core';

@Injectable()
export class QianFanService {
  redisAuthKey = 'QianFan:Auth';
  constructor(
    private config: ConfigService,
    private redis: RedisService,
  ) {}

  async textGeneration(input: QianFanInput) {
    const token = await this.getAccessToken();
    const { prompt } = input;
    const response = await fetch(
      `${QIANFAN_URL}/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${token}`,
      {
        method: 'POST',
        headers: this.setHeader(),
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new BadRequestException(data);
    }
  }

  textGenerationSubject(input: QianFanStreamInput): Observable<AigcStreamOutput> {
    return new Observable((output) => {
      this.getAccessToken().then((token) => {
        const { messages } = input;
        const data = {
          messages,
          stream: true,
        };

        const child = spawn('curl', [
          '-X',
          'POST',
          `${QIANFAN_URL}/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${token}`,
          '-d',
          JSON.stringify(data),
        ]);

        let surplus: Buffer = null;
        let start = 0;

        child.stdout.on('data', (buffer: Buffer) => {
          try {
            const obj = JSON.parse(buffer.toString());
            if (obj && obj.error_code) {
              output.next({
                data: [
                  {
                    code: obj.error_code,
                    message: obj.error_msg,
                    error: true,
                    requestId: obj.id,
                    status: 400,
                  },
                ],
              });
              output.complete();
              child.kill();
            }
          } catch {}

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
          output.complete();
          child.kill();
        });
        child.on('error', (error) => {
          output.error(error);
          output.complete();
          child.kill();
        });
      });
    });
  }

  private async getAccessToken() {
    const token = await this.redis.get(this.redisAuthKey);

    if (token) {
      try {
        return JSON.parse(token).access_token;
      } catch {}
    }

    const response = await fetch(
      `${QIANFAN_URL}/oauth/2.0/token?client_id=${this.config.getOrThrow('QIANFAN_API_KEY')}&client_secret=${this.config.getOrThrow('QIANFAN_SECRET_KEY')}&grant_type=client_credentials`,
      {
        method: 'POST',
        headers: this.setHeader(),
      },
    );
    const data = await response.json();
    if (response.ok) {
      await this.redis.set(this.redisAuthKey, JSON.stringify(data), 'EX', 60 * 60 * 24 * 30);
      return data.access_token;
    } else {
      throw new BadRequestException(data);
    }
  }

  private setHeader(): Headers {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', `application/json`);
    return headers;
  }

  private matchBuffer(buffer: Buffer, start: number) {
    const str = buffer.toString();
    const list = str.split(/\n\n/);
    const data: AigcOutput[] = [];
    let end = start;
    for (let i = start; i < list.length; i++) {
      const item = list[i];
      const dataMatch = item.match(/data: (.*)$/m);
      const dataStr = dataMatch ? dataMatch[1] : null;
      try {
        const dataObj = dataStr ? JSON.parse(dataStr) : null;
        if (dataObj) {
          const { id, usage, result, is_end, sentence_id } = dataObj;
          data.push({
            finished: is_end,
            index: sentence_id,
            text: result,
            inputTokens: usage.prompt_tokens,
            outputTokens: usage.completion_tokens,
            totalTokens: usage.total_tokens,
            requestId: id,
            status: 200,
          });

          end = i;
        }
      } catch {}
    }
    const analyzed = data;

    return { analyzed, end };
  }
}
