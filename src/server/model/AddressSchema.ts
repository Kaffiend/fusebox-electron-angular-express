import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';

export interface AddressDTO {
    _id?: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
}

/**
 * Iridium config
 */
@Index({ name: 1 })
@Collection('addresses')
export class AddressMongoSchema extends Instance<AddressDTO, AddressMongoSchema> implements AddressDTO {
    @ObjectID
    // tslint:disable-next-line:variable-name
    public _id: string;
    @Property(String, true)
    public address1: string;
    @Property(String, false)
    public address2: string;
    @Property(String, true)
    public city: string;
    @Property(String, true)
    public state: string;
    @Property(String, true)
    public zip: string;
    @Property(String, true)
    public country: string;
}

class AddressDatabase extends Core {
    public Addresses = new Model<AddressDTO, AddressMongoSchema>(this, AddressMongoSchema);
}

export const mongoDatabase = new AddressDatabase({ database: 'test_db' });

// delete everything from mongo
// database.connect().then(() => database.Addresses.remove()).then(() => database.Addresses.get()).then(() => database.close());
