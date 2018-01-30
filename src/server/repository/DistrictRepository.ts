import { injectable } from 'inversify';
import { districtDb, DistrictDTO, DistrictMongoSchema } from '../model/DistrictSchema';
import 'reflect-metadata';
import { logger } from '../util/Logger';

export interface DistrictRepository {
    findAll(): Promise<Array<DistrictDTO>>;
}

@injectable()
export class DistrictRepository implements DistrictRepository {

    public async findAll(): Promise<Array<DistrictDTO>> {
        const districtDTOs = await districtDb.connect().then(() => districtDb.Districts.find());
        return districtDTOs.toArray();
    }

    public async create(districDTO: DistrictDTO): Promise<DistrictDTO> {
        return await districtDb.connect().then(() => districtDb.Districts.create(districDTO));
    }

}

