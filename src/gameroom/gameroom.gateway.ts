import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(81, {
    namespace: 'gameRoom',
    cors: {
        origin: '*',
    },
})
export class GameroomGateway {
    constructor() {}

    @WebSocketServer()
    server: Server;

    @SubscribeMessage('message')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }
}
