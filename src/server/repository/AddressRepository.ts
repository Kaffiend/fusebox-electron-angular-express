import { injectable } from 'inversify';
import { mongoDatabase, AddressDTO, AddressMongoSchema } from '../model/AddressSchema';
import 'reflect-metadata';
import { logger } from '../util/Logger';

export interface AddressRepository {
    findAll(): Promise<Array<AddressDTO>>;
    create(addressDTO: AddressDTO): Promise<AddressDTO>;
    update(addressDTO: AddressDTO): Promise<AddressDTO>;
    find(id: string): Promise<AddressDTO>;
}

@injectable()
export class AddressRepository implements AddressRepository {
    public async findAll(): Promise<Array<AddressDTO>> {
        const addressDTOs = await mongoDatabase.connect().then(() => mongoDatabase.Addresses.find());
        return addressDTOs.toArray();
    }

    public async create(addressDTO: AddressDTO): Promise<AddressDTO> {
        return await mongoDatabase.connect().then(() => mongoDatabase.Addresses.create(addressDTO));
    }

    public async update(addressDTO: AddressDTO): Promise<AddressDTO> {
        const dto: AddressMongoSchema = await mongoDatabase.connect().then(() => mongoDatabase.Addresses.findOne(addressDTO._id));

        dto.address1 = addressDTO.address1;
        if (addressDTO.address2) {
            dto.address2 = addressDTO.address2;
        } else {
            // undefined isn't handled by mongo, so set to null
            dto.address2 = null;
        }
        dto.city = addressDTO.city;
        dto.city = addressDTO.city;
        dto.zip = addressDTO.zip;
        dto.country = addressDTO.country;

        const saved = await dto.save((err: Error, a: AddressDTO) => {
            if (err) {
                logger.error('Error updating address: ' + err);
                // TODO this needs to be handled better.
                throw err;
            }
            return a;
        });

        return saved;
    }

    public async find(id: string): Promise<AddressDTO> {
        return await mongoDatabase.connect().then(() => mongoDatabase.Addresses.findOne(id));
    }
}
