import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { AigcService } from './aigc.service';
import { AigcMessageInput, AigcType } from './aigc.enum';
import { QwenModel } from './dashscope';
import { Server, Socket } from 'socket.io';
import { Observable, map, of } from 'rxjs';
import { AigcStreamOutput } from './aigc-stream.output';

@WebSocketGateway(3010, { transports: ['websocket'], path: '/aigc' })
export class AigcGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(private readonly aigcService: AigcService) {}

  handleConnection(_client: Socket) {}

  handleDisconnect(_client: Socket) {}

  @SubscribeMessage('text-generation')
  handleEvent(@MessageBody() data: AigcMessageInput[]): Observable<WsResponse<AigcStreamOutput>> {
    try {
      return this.aigcService
        .textGenerationSubject({
          type: AigcType.Qwen,
          model: QwenModel.Qwen18BChat,
          messages: data,
        })
        .pipe(map((x) => ({ event: 'text-generation', data: x })));
    } catch {
      return of({ event: 'error', data: null });
    }
  }
}
