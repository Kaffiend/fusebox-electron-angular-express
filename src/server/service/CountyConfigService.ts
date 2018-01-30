import { injectable, inject } from 'inversify';
import { CountyConfig, ConfigAssessor } from '../model/CountyConfig';
import { CountyConfigRepository } from '../repository/CountyConfigRepository';
import { DistrictRepository } from '../repository/DistrictRepository';
import { TYPES } from '../types';
import 'reflect-metadata';
import { CountyConfigDTO } from '../model/CountyConfigSchema';
import * as _ from 'lodash';

export interface CountyConfigService {
    getCountyConfig(configName: string): Promise<CountyConfig>;
}

@injectable()
export class CountyConfigServiceImpl implements CountyConfigService {

    @inject(TYPES.CountyConfigRepository)
    private countyConfigRepositoryMongo: CountyConfigRepository;

    public async getCountyConfig(configName: string): Promise<CountyConfig> {
        const countyConfigMongo: CountyConfig = await this.countyConfigRepositoryMongo.find(configName)
            .then((c) => {
                return this.toCountyConfigDTO(c);
            });
        return countyConfigMongo;
    }

    private toCountyConfigDTO(conf: CountyConfigDTO) {
        return new CountyConfig(
            conf.configName,
            conf.countyName,
            conf.assessorName,
           conf._id.toString()
        );
    }
}
