import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { WebSocket, MessageEvent } from 'ws';
import { AigcService } from './aigc.service';
import { AigcType } from './aigc.enum';
import { QwenModel } from './dashscope';

@WebSocketGateway(3010, { path: 'aigc' })
export class AigcGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly aigcService: AigcService) {}

  handleConnection(client: WebSocket) {
    client.onmessage = (event: MessageEvent) => {
      if (event && event.data) {
        try {
          const data = JSON.parse(event.data as string);
          this.aigcService
            .textGenerationSubject({
              type: AigcType.Qwen,
              model: QwenModel.Qwen18BChat,
              messages: data,
            })
            .subscribe((x) => {
              client.send(JSON.stringify(x));
            });
        } catch {}
      }
    };
  }

  handleDisconnect(_client: WebSocket) {}
}
