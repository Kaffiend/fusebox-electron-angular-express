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

export interface EndpointDTO {
    stateId: number;
    countyId: number;
    stateAbbreviation: string;
    url: string;
    name: string;
    status: number;
    hasCreditModule: boolean;
    hasArchiveModule: boolean;
    hasAccountsReceivableModule: boolean;
    _id?: string;
}

@Collection('endpoints')
export class EndpointMongoSchema extends Instance<EndpointDTO, EndpointMongoSchema> {
    @ObjectID
    _id: string;
    @Property(Number)
    stateId: number;
    @Property(Number)
    countyId: number;
    @Property(String)
    stateAbbreviation: string;
    @Property(String)
    url: string;
    @Property(String)
    name: string;
    @Property(Number)
    status: number;
    @Property(Boolean)
    hasCreditModule: boolean;
    @Property(Boolean)
    hasArchiveModule: boolean;
    @Property(Boolean)
    hasAccountsReceivableModule: boolean;
}

class EndpointDatabase extends Core {
    public Endpoint = new Model<EndpointDTO, EndpointMongoSchema>(this, EndpointMongoSchema);
}

let initEndpoint = new EndpointDatabase({ database: 'test_db' });
initEndpoint.connect().then(() => initEndpoint.Endpoint.find().toArray().then((endpoints) => {
    if (endpoints.length < 1) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId: 85,
            stateAbbreviation: 'WV',
            name: 'Ritchie County',
            url: 'https://ritchie.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: true,
            hasAccountsReceivableModule: true
        });
    }
    if (endpoints.length < 2) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId:95 ,
            stateAbbreviation: 'WV',
            name: 'Tyler County',
            url: 'https://tyler.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: true,
            hasAccountsReceivableModule: true
        });
    }
    if (endpoints.length < 3) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId: 107,
            stateAbbreviation: 'WV',
            name: 'Wood County',
            url: 'https://wood.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: false,
            hasAccountsReceivableModule: true
        });
    }
    if (endpoints.length < 4) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId: 107,
            stateAbbreviation: 'WV',
            name: 'Boone County',
            url: 'https://boone.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: false,
            hasAccountsReceivableModule: false
        });
    }
    if (endpoints.length < 5) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId: 107,
            stateAbbreviation: 'WV',
            name: 'Pocahontas County',
            url: 'https://pocahontas.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: false,
            hasAccountsReceivableModule: true
        });
    }
    if (endpoints.length < 6) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId: 107,
            stateAbbreviation: 'WV',
            name: 'Gilmer County',
            url: 'https://gilmer.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: false,
            hasAccountsReceivableModule: true
        });
    }
    if (endpoints.length < 7) {
        initEndpoint.Endpoint.insert({
            stateId: 54,
            countyId: 107,
            stateAbbreviation: 'WV',
            name: 'Wayne County',
            url: 'https://wayne.cssiwv.com',
            status: 1,
            hasCreditModule: true,
            hasArchiveModule: true,
            hasAccountsReceivableModule: true
        });
    }
} ));

export const mongoEndpoint = new EndpointDatabase({ database: 'test_db' });
