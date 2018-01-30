
import { injectable, inject } from 'inversify';
import { District }from '../model/District';
import { DistrictDTO } from '../model/DistrictSchema';
import { DistrictRepository } from '../repository/DistrictRepository';
import { TYPES } from '../types';
import 'reflect-metadata';
import { CountyConfigDTO } from '../model/CountyConfigSchema';
import * as _ from 'lodash';

export interface DistrictService {
   findAll():Promise<Array<DistrictDTO>>;
   createDistrict(district: DistrictDTO): Promise<DistrictDTO>;
}

@injectable()
export class DistrictServiceImpl implements DistrictService {
    @inject(TYPES.DistrictRepository)
    private districtRepository: DistrictRepository;

    public async findAll(): Promise<Array<DistrictDTO>> {
        const districtsMongo: Array<DistrictDTO> = await this.districtRepository.findAll();
        return districtsMongo;
    }

    public async createDistrict(district: DistrictDTO): Promise<DistrictDTO> {
        const created = this.districtRepository.create(district);
        return created;
    }
}

/**
 * TODO: need to add model operations for sanitization.
 */
