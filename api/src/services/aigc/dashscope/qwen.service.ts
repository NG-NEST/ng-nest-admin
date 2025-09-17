import { BadRequestException, Injectable } from '@nestjs/common';
import { DASHSCOPE_OPENAI_URL, DASHSCOPE_URL } from './qwen.constants';
import { ConfigService } from '@nestjs/config';
import { QwenInput } from './qwen.input';
import { Observable } from 'rxjs';
import { AigcOutput } from '../aigc.output';
import { AigcStreamOutput } from '../aigc-stream.output';
import { QwenStreamInput } from './qwen-stream.input';
import { RedisService } from '@api/core';
import OpenAI from 'openai';
import { OpenAIError } from 'openai/error';

@Injectable()
export class QwenService {
  expires = 60 * 5; // seconds, max 1800
  redisAuthKey = 'Qwen:Auth';

  openai: OpenAI;

  constructor(
    private config: ConfigService,
    private redis: RedisService,
  ) {
    (async () => {
      this.openai = new OpenAI({
        apiKey: await this.getAccessToken(),
        baseURL: DASHSCOPE_OPENAI_URL,
      });
    })();
  }

  async textGeneration(input: QwenInput): Promise<AigcOutput> {
    const { model, prompt } = input;
    try {
      const completion = await this.openai.completions.create({
        model,
        prompt,
      });

      const { text, finish_reason } = completion.choices[0];
      const { prompt_tokens, completion_tokens } = completion.usage;

      return {
        finished: finish_reason === 'stop',
        text,
        inputTokens: prompt_tokens,
        outputTokens: completion_tokens,
        requestId: completion.id,
      };
    } catch (e) {
      if (e instanceof OpenAIError) {
        throw new BadRequestException(e.message);
      }
      throw e;
    }
  }

  textGenerationSubject(input: QwenStreamInput): Observable<AigcStreamOutput> {
    return new Observable((output) => {
      (async () => {
        const { model, messages } = input;
        try {
          const stream = await this.openai.chat.completions.create({
            model,
            messages,
            stream: true,
          });

          for await (const chunk of stream) {
            console.log(chunk);
            const { content } = chunk.choices[0].delta;
            const text = content ?? '';

            output.next({
              data: [
                {
                  finished: false,
                  text,
                  requestId: chunk.id,
                  index: chunk.choices[0].index,
                  status: 200,
                },
              ],
            });

            // if () {
            // output.complete();
            // }
          }
        } catch (e) {
          output.error(e);
          output.complete();
        }
      })();
    });
  }

  private async getAccessToken() {
    let cache = await this.redis.get(this.redisAuthKey);

    if (cache) {
      try {
        return JSON.parse(cache).token;
      } catch {}
    }

    const apiKey = this.config.getOrThrow('DASHSCOPE_API_KEY');
    const response = await fetch(DASHSCOPE_URL + '/api/v1/tokens', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (response.ok) {
      await this.redis.set(this.redisAuthKey, JSON.stringify(data), 'EX', this.expires);
      return data.token;
    } else {
      throw new BadRequestException(data);
    }
  }

  // The following methods are no longer needed
  // private async setHeader(sse = false): Promise<Headers> {
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   headers.append('Authorization', `Bearer ${await this.getAccessToken()}`);
  //   if (sse) {
  //     headers.append('X-DashScope-SSE', 'enable');
  //   }
  //   return headers;
  // }

  // private replaceRepeat(text: string, rep: string) {
  //   const escapeRegExp = (str: string) => {
  //     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  //   };

  //   const escapedPrefix = escapeRegExp(rep);
  //   return text.replace(new RegExp(`^${escapedPrefix}`), '');
  // }

  // private matchBuffer(buffer: Buffer, start: number) {
  //   const str = buffer.toString();
  //   const list = str.split(/\n\n/);
  //   const data: AigcOutput[] = [];
  //   let end = start;
  //   for (let i = start; i < list.length; i++) {
  //     const item = list[i];
  //     const idMatch = item.match(/id:(\d+)/);
  //     const httpStatusMatch = item.match(/:HTTP_STATUS\/(\d+)/);
  //     const dataMatch = item.match(/data:(.*)$/m);
  //     const id = idMatch ? Number(idMatch[1]) : null;
  //     const httpStatus = httpStatusMatch ? Number(httpStatusMatch[1]) : null;
  //     const dataStr = dataMatch ? dataMatch[1] : null;
  //     try {
  //       const dataObj = dataStr ? JSON.parse(dataStr) : null;
  //       if (id && dataObj) {
  //         if (httpStatus === 200) {
  //           const { output, usage, request_id } = dataObj;
  //           data.push({
  //             finished: output.finish_reason === 'stop',
  //             index: id,
  //             text: output.text,
  //             inputTokens: usage.input_tokens,
  //             outputTokens: usage.output_tokens,
  //             totalTokens: usage.input_tokens + usage.output_tokens,
  //             requestId: request_id,
  //             status: httpStatus,
  //           });
  //         } else {
  //           const { code, message, request_id } = dataObj;
  //           data.push({
  //             status: httpStatus,
  //             error: true,
  //             message,
  //             requestId: request_id,
  //             code,
  //           });
  //         }

  //         end = i;
  //       }
  //     } catch { }
  //   }

  //   return { analyzed: data, end };
  // }
}
