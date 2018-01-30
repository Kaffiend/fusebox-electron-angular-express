import {
    Core,
    Model,
    Instance,
    Collection,
    Index,
    Property,
    Transform,
    ObjectID,
    Configuration
} from 'iridium';

import * as _ from 'lodash';

export interface DistrictDTO {
    _id?: string;
    description: string;
    districtNumber: number;
    sortSequence: number;
}

/**
 * Iridium Config
 */

 @Collection('districts')
 @Index({ description: 1 })
 export class DistrictMongoSchema extends Instance<DistrictDTO, DistrictMongoSchema> {
     @ObjectID
     public _id: string;
     @Property(String)
     public description;
     @Property(String)
     public quickCode;
     @Property(Number)
     districtNumber: number;
     @Property(Number)
     sortSequence: number;
 }

class DistrictDatabase extends Core {
    public Districts = new Model<DistrictDTO, DistrictMongoSchema>(this, DistrictMongoSchema);
}

export const districtDb = new DistrictDatabase({ database: 'test_db' });
