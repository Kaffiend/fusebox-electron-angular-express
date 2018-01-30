import { RegisterableSocket } from './RegisterableSocket';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { DistrictService } from '../service/DistrictService';
import { DistrictDTO } from '../model/DistrictSchema';

@injectable()
export class DistrictSocket implements RegisterableSocket {
    private districtService: DistrictService;
    private socket: SocketIO.Socket;
    private io: SocketIO.Server;

    constructor(
        @inject(TYPES.DistrictService) districtService: DistrictService
    ) {
        this.districtService = districtService;
    }

    public register(io: SocketIO.Server): void {
        this.io = io;
        console.log('district socket registered');
        this.io.on('connection', (socket: SocketIO.Socket) => {
            this.socket = socket;
            this.socket.on('District:Read', () => this.getDistricts());
            this.socket.on('District:Create', (district) => this.createDistrict(district));
        });
    }

    public async getDistricts(): Promise<void> {
        console.log('district read called');
        const dist = await this.districtService.findAll();
        this.socket.emit('District:Return', dist);
    }

    public async createDistrict(district: DistrictDTO): Promise<void> {
        const created = await this.districtService.createDistrict(district);
        this.socket.emit('District:Return', created);
    }

}
