import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { interval } from 'rxjs';
import { WebSocket } from 'ws';
import { JwtGuard } from '../auth';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway(3010, { path: 'aigc' })
export class AigcGateway implements OnGatewayConnection, OnGatewayDisconnect {
    
  @UseGuards(JwtGuard)
  handleConnection(client: WebSocket) {
    client.onmessage = (event) => {
      console.log(event.data);
    };
    interval(1000).subscribe((x) => {
      client.send(JSON.stringify({ connected: x }));
    });
  }

  handleDisconnect(client: WebSocket) {
    client.emit('event', { disconnected: '123456' });
  }
}
