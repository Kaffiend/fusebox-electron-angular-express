import { injectable, inject } from 'inversify';
import { Endpoint } from '../model/Endpoint';
import { EndpointDTO } from '../model/EndpointSchema';
import { EndpointRepository } from '../repository/EndpointRepository';
import { TYPES } from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';

export interface EndpointService {
    getAllEndpoints(): Promise<Array<EndpointDTO>>;
}

@injectable()
export class EndpointServiceImpl implements EndpointService {

    @inject(TYPES.EndpointRepository)
    private endpointRepositoryMongo: EndpointRepository;

    public async getAllEndpoints(): Promise<Array<EndpointDTO>> {
        const endpointDTO = await this.endpointRepositoryMongo.findAll().then((endpoints => {
            return endpoints;
        }));
        return endpointDTO;
    }

    private toCountyConfigDTO(conf: EndpointDTO) {
        return new Endpoint(
            conf.stateId,
            conf.countyId,
            conf.stateAbbreviation,
            conf.url,
            conf.name,
            conf.status,
            conf.hasCreditModule,
            conf.hasArchiveModule,
            conf.hasAccountsReceivableModule,
            conf._id.toString()
        );
    }
}
