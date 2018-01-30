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

export interface CountyConfigDTO {
    _id?: string;
    configName: string;
    countyName: string;
    assessorName: string;
}

/*
 * Iridium Config
 */

@Transform(document => document, (document, property, model) => {
    Object.keys(document).forEach(key => {
        if (!model.schema.hasOwnProperty(key)) delete document[key];
    });

    return document;
})
@Collection('configs')
@Index({ configName: 1 })
export class CountyConfigMongoSchema extends Instance<CountyConfigDTO, CountyConfigMongoSchema> {
    @ObjectID
    public _id: String;
    @Property(String)
    public configName: string;
    @Property(String)
    countyName: String;
    @Property(String)
    assessorName: String;
}


class ConfigDatabase extends Core {

    public CountyConfig = new Model<CountyConfigDTO, CountyConfigMongoSchema>(this, CountyConfigMongoSchema);
}

let configInit = new ConfigDatabase({ database: 'test_db' });
configInit.connect().then(() => configInit.CountyConfig.findOne({ configName: 'county' }).then((conf) => {
    if (!conf) {
        configInit.CountyConfig.insert(<CountyConfigDTO>{ configName: 'county', countyName: 'CSS', assessorName: 'Ian Mackie' });
    }
}));

export const mongoDb = new ConfigDatabase({ database: 'test_db' });
