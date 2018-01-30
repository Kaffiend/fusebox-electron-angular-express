import { injectable } from 'inversify';
import { mongoDb, CountyConfigDTO, CountyConfigMongoSchema } from '../model/CountyConfigSchema';
import 'reflect-metadata';
import { logger } from '../util/Logger';

export interface CountyConfigRepository {
    find(configName: string): Promise<CountyConfigDTO>;
    findById(id: string): Promise<CountyConfigDTO>;
}

@injectable()
export class CountyConfigRepository implements CountyConfigRepository {

    public async find(configName: string): Promise<CountyConfigDTO> {
        const configDTO = await mongoDb.connect().then(() =>
            mongoDb.CountyConfig.findOne({ configName: configName }));
        return configDTO.toJSON();
    }

    public async findById(id: string): Promise<CountyConfigDTO> {
        const configDTO = await mongoDb.connect().then(() =>
            mongoDb.CountyConfig.findOne(id));
        return configDTO.toJSON();
    }
}
