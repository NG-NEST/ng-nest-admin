import { BadRequestException, Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Observable } from 'rxjs';
import { OpenAIInput, TextGenerationOutput, TextGenerationStreamOutput } from './openai.interface';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@api/core';

const DASHSCOPE_URL = 'https://dashscope.aliyuncs.com';
const DASHSCOPE_OPENAI_URL = `${DASHSCOPE_URL}/compatible-mode/v1`;

@Injectable()
export class DashscopeService {
  expires = 60 * 5; // seconds, max 1800
  redisAuthKey = 'Dashscope:Auth';

  openai: OpenAI;

  constructor(
    private config: ConfigService,
    private redis: RedisService,
  ) {
    this.initializeOpenAI();
  }

  private async initializeOpenAI(): Promise<void> {
    try {
      const { token, isCache } = await this.getAccessToken();
      console.log(token, isCache);
      if (isCache) return;
      this.openai = new OpenAI({
        apiKey: token,
        baseURL: DASHSCOPE_OPENAI_URL,
      });
    } catch (error) {
      throw new BadRequestException('Failed to initialize OpenAI service');
    }
  }

  async textGeneration(input: OpenAIInput): Promise<TextGenerationOutput> {
    try {
      // 确保 OpenAI 客户端已初始化, token 有效
      await this.initializeOpenAI();

      // 构建消息数组
      const messages = this.buildMessages(input);

      // 调用 DashScope/OpenAI API
      const completion = await this.openai.chat.completions.create({
        model: input.model!,
        messages: messages,
        temperature: input.temperature !== undefined ? input.temperature : 0.7,
        max_tokens: input.maxTokens || 1000,
        top_p: input.topP !== undefined ? input.topP : 0.9,
        frequency_penalty: input.frequencyPenalty,
        presence_penalty: input.presencePenalty,
      });

      return {
        id: completion.id,
        object: completion.object,
        created: completion.created,
        model: completion.model,
        choices: completion.choices,
        usage: completion.usage,
      };
    } catch (error) {
      console.error('OpenAI text generation error:', error);

      // 处理 OpenAI 错误
      if (error instanceof OpenAI.APIError) {
        throw new BadRequestException({
          message: 'OpenAI API error',
          error: error.message,
          status: error.status,
          type: error.type,
        });
      } else {
        throw new BadRequestException({
          message: 'Text generation failed',
          error: error.message,
        });
      }
    }
  }

  textGenerationSubject(input: OpenAIInput): Observable<TextGenerationStreamOutput> {
    return new Observable((observer) => {
      (async () => {
        try {
          // 确保 OpenAI 客户端已初始化, token 有效
          await this.initializeOpenAI();

          // 构建消息数组
          const messages = this.buildMessages(input);

          // 调用 DashScope/OpenAI API 并启用流式响应
          const stream = await this.openai.chat.completions.create({
            model: input.model!,
            messages: messages,
            temperature: input.temperature !== undefined ? input.temperature : 0.7,
            max_tokens: input.maxTokens || 1000,
            top_p: input.topP !== undefined ? input.topP : 0.9,
            frequency_penalty: input.frequencyPenalty,
            presence_penalty: input.presencePenalty,
            stream: true,
          });

          // 流式传输响应
          for await (const chunk of stream) {
            const choice = chunk.choices[0];
            console.log(chunk);
            console.log('-----------');
            console.log(choice);
            observer.next({
              id: chunk.id,
              object: chunk.object,
              created: chunk.created,
              model: chunk.model,
              content: choice.delta?.content ?? '',
              finishReason: choice.finish_reason,
            });
          }

          // 完成流式传输
          observer.complete();
        } catch (error) {
          console.error('OpenAI text generation stream error:', error);

          // 处理 OpenAI 错误
          if (error instanceof OpenAI.APIError) {
            observer.error(
              new BadRequestException({
                message: 'OpenAI API stream error',
                error: error.message,
                status: error.status,
                type: error.type,
              }),
            );
          } else {
            observer.error(
              new BadRequestException({
                message: 'Text generation stream failed',
                error: error.message,
              }),
            );
          }
        }
      })();
    });
  }

  private buildMessages(input: OpenAIInput): OpenAI.Chat.ChatCompletionMessageParam[] {
    // 如果输入已经是消息数组格式，直接返回
    if (Array.isArray(input.messages) && input.messages.length > 0) {
      return input.messages;
    }

    // 如果有 prompt 字段，构造消息数组
    if (input.prompt) {
      return [
        {
          role: 'system',
          content: input.system || 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: input.prompt,
        },
      ];
    }

    // 默认消息
    return [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      {
        role: 'user',
        content: 'Hello!',
      },
    ];
  }

  private async getAccessToken() {
    let cache = await this.redis.get(this.redisAuthKey);

    if (cache) {
      try {
        return { token: JSON.parse(cache).token, isCache: true };
      } catch {}
    }

    const apiKey = this.config.getOrThrow('DASHSCOPE_API_KEY');
    const response = await fetch(
      `${DASHSCOPE_URL}/api/v1/tokens?expire_in_seconds=${this.expires}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (response.ok) {
      await this.redis.set(this.redisAuthKey, JSON.stringify(data), 'EX', this.expires);
      return { token: data.token, isCache: false };
    } else {
      throw new BadRequestException(data);
    }
  }
}
