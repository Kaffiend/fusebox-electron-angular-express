import { RegisterableSocket } from './RegisterableSocket';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { CountyConfigService } from '../service/CountyConfigService';

@injectable()
export class CountyConfigSocket implements RegisterableSocket {

    private countyConfigService: CountyConfigService;
    private socket: SocketIO.Socket;
    private io: SocketIO.Server;

    constructor(
        @inject(TYPES.CountyConfigService) countyConfigService: CountyConfigService,
    ) {
        this.countyConfigService = countyConfigService;
    }
    public register(io: SocketIO.Server): void {
        this.io = io;
        console.log('registering county config socket');
        this.io.on('connection', (socket: SocketIO.Socket) => {
            console.log('client connected');
            this.socket = socket;
            this.socket.on('CountyConfig:Read', () => this.getCountyConfig('county'));
        });
    }

    public async getCountyConfig(configName: string): Promise<void> {
        console.log(configName);
        const conf = await this.countyConfigService.getCountyConfig(configName);
        this.socket.emit('Config:Return', conf);
    }
}
