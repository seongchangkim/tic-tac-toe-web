import {
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
    namespace: 'gameRoom',
    cors: {
        origin: '*',
    },
})
export class GameRoomGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    constructor() {}

    @WebSocketServer()
    server: Server;

    handleDisconnect(client: Socket) {
       console.log(`disConnection : ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`connection : ${client.id}`);
    }

    afterInit(server: Server) {
        throw new Error('Method not implemented.');
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }
}
