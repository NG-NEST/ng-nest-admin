import { INestApplicationContext, WebSocketAdapter } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { EMPTY, Observable, filter, fromEvent, mergeMap } from 'rxjs';
import { WebSocket, ServerOptions, Server } from 'ws';

export class WsAdapter implements WebSocketAdapter<Server, WebSocket> {
  constructor(private app: INestApplicationContext) {}
  create(port: number, options?: ServerOptions): Server {
    const server = new WebSocket.Server({ port, ...options });
    server.addListener('connection', (client, request) => {
      console.log(client, request, this.app);
    });
    return server;
  }
  bindClientConnect(server: Server, callback: () => void) {
    server.on('connection', callback);
  }
  bindClientDisconnect(client: WebSocket, callback: Function) {
    client.emit('disconnect', callback);
  }
  bindMessageHandlers(
    client: WebSocket,
    handlers: MessageMappingProperties[],
    transform: (data: any) => Observable<any>,
  ) {
    fromEvent(client, 'message')
      .pipe(
        mergeMap((data: Buffer) => this.bindMessageHandler(data, handlers, transform)),
        filter((result) => result),
      )
      .subscribe((response) => client.send(JSON.stringify(response)));
  }
  close(server: Server) {
    server.close();
  }

  private bindMessageHandler(
    buffer: any,
    handlers: MessageMappingProperties[],
    process: (data: any) => Observable<any>,
  ): Observable<any> {
    const message = JSON.parse(buffer.data);
    const messageHandler = handlers.find((handler) => handler.message === message.event);
    if (!messageHandler) {
      return EMPTY;
    }
    return process(messageHandler.callback(message.data));
  }
}
