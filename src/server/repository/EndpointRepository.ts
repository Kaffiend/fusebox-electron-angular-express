import { injectable } from 'inversify';
import { EndpointDTO, EndpointMongoSchema, mongoEndpoint } from '../model/EndpointSchema';
import 'reflect-metadata';
import { logger } from '../util/Logger';

export interface EndpointRepository {
    findAll(): Promise<Array<EndpointDTO>>;
}

@injectable()
export class EndpointRepository implements EndpointRepository {
    public async findAll(): Promise<Array<EndpointDTO>> {
        const endpointDTO = await mongoEndpoint.connect().then(() => mongoEndpoint.Endpoint.find());
        return endpointDTO.toArray();
    }
}
