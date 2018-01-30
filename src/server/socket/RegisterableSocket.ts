import * as io from 'socket.io';

export interface RegisterableSocket {
    register(io: SocketIO.Server): void;
}
