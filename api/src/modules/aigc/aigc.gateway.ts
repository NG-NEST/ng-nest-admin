import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Observable, map } from 'rxjs';
import { HttpStatus } from '@nestjs/common';
import { ValidatorDescription, I18nService } from '@api/core';
import {
  AIGC_MODELS,
  AIGC_TYPES,
  AigcDescription,
  AigcI18n,
  AigcMessageInput,
  AigcModel,
  AigcService,
  AigcStreamOutput,
  AigcType,
  AuthI18n,
  AuthService,
  AuthUnauthorized,
  JWT_CONSTANTS,
} from '@api/services';

@WebSocketGateway(3010, { path: '/aigc' })
export class AigcGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly aigcService: AigcService,
    private readonly i18n: I18nService,
    private readonly auth: AuthService,
  ) {}

  async handleConnection(socket: Socket) {
    const headers = socket.handshake.headers;
    const token = this.auth.extractTokenFromHeader(headers);
    const payload = await this.auth.verifyToken('accessToken', token, JWT_CONSTANTS.secret);
    if (!payload) {
      socket.emit('error', {
        status: HttpStatus.UNAUTHORIZED,
        message: this.i18n.t(`${AuthI18n}.${AuthUnauthorized.Unauthorized}`, headers),
        error: true,
        code: AuthUnauthorized.Unauthorized,
      });
      socket.disconnect(true);
    }
    const { type, model } = socket.handshake.query;
    if (!AIGC_TYPES.includes(type as AigcType)) {
      socket.emit('error', {
        status: HttpStatus.BAD_REQUEST,
        message: this.i18n.t(
          `${AigcI18n}.${AigcDescription.Type}${ValidatorDescription.IsIn}`,
          headers,
        ),
        error: true,
      });
      socket.disconnect(true);
    }
    if (!AIGC_MODELS.includes(model as AigcModel)) {
      socket.emit('error', {
        status: HttpStatus.BAD_REQUEST,
        message: this.i18n.t(
          `${AigcI18n}.${AigcDescription.Model}${ValidatorDescription.IsIn}`,
          headers,
        ),
        error: true,
      });
      socket.disconnect(true);
    }
  }

  handleDisconnect(_socket: Socket) {}

  @SubscribeMessage('text-generation')
  handleEvent(
    @MessageBody() data: AigcMessageInput[],
    @ConnectedSocket() socket: Socket,
  ): Observable<WsResponse<AigcStreamOutput>> {
    const { type, model } = socket.handshake.query;
    return this.aigcService
      .textGenerationSubject({
        type: type as AigcType,
        model: model as AigcModel,
        messages: data,
      })
      .pipe(map((x) => ({ event: 'text-generation', data: x })));
  }
}
