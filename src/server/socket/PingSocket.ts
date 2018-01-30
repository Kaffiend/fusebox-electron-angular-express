import { RegisterableSocket } from './RegisterableSocket';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';

@injectable()
export class PingSocket implements RegisterableSocket {
    private socket: SocketIO.Socket;
    private io: SocketIO.Server;

    public register(io: SocketIO.Server): void {
        this.io = io;
        console.log('pong socket registered');
        this.io.on('connection', (socket: SocketIO.Socket) => {
            this.socket = socket;
            this.socket.on('ping', () => this.Pong());
        });
    }

    public async Pong(): Promise<void> {
        console.log('district read called');
        this.socket.emit('pong');
    }

}

