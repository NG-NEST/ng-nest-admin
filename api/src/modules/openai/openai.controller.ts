import { OpenAIInput, OpenAIService } from '@api/services';
import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';
import { Subscription } from 'rxjs';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openaiService: OpenAIService) {}

  @Post()
  async postSse(
    @Body() body: any,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    let subscription: Subscription | null = null;

    let data: OpenAIInput = body;

    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream;charset=UTF-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    reply.raw.write(
      `data: ${JSON.stringify({
        status: 'processing',
        platform: data.platform,
        model: data.model,
        message: 'Starting request',
      })}\n\n`,
    );

    const streamObservable = this.openaiService.textGenerationSubject(data);

    subscription = streamObservable.subscribe({
      next: (chunk) => {
        reply.raw.write(
          `data: ${JSON.stringify({
            status: 'streaming',
            content: chunk.content,
            id: chunk.id,
            finishReason: chunk.finishReason,
          })}\n\n`,
        );
      },
      error: (error) => {
        reply.raw.write(
          `data: ${JSON.stringify({
            status: 'error',
            platform: data.platform,
            model: data.model,
            message: error.response?.message || error.message || 'Error processing request',
          })}\n\n`,
        );
        reply.raw.end();
      },
      complete: () => {
        reply.raw.write(
          `data: ${JSON.stringify({
            status: 'completed',
            message: 'Response completed',
          })}\n\n`,
        );

        reply.raw.end();
      },
    });

    // 处理客户端断开连接
    request.raw.on('close', () => {
      // 取消订阅以释放资源
      subscription?.unsubscribe();
      if (!reply.raw.writableEnded) {
        reply.raw.end();
      }
    });
  }
}
