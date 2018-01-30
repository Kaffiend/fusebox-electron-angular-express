import { injectable } from 'inversify';
import { User } from '../model/User';
import { IUserDocument, UserSchema, mongoUser } from '../model/UserSchema';
import 'reflect-metadata';
import { logger } from '../util/Logger';

export interface UserRepository {
    findOne(id: string): Promise<IUserDocument>;
    createUser(userDoc: IUserDocument): Promise<IUserDocument>;
    updateUser(user: IUserDocument): Promise<IUserDocument>;
}

@injectable()
export class UserRepository implements UserRepository {

    public async findOne(id: string): Promise<IUserDocument> {
        const userDoc = await mongoUser.connect().then(() => mongoUser.Users.findOne(id));
        return userDoc.toJSON();
    }

    public async validate(username: string, password: string): Promise<boolean> {
        const userDoc = await mongoUser.connect().then(() => mongoUser.Users.findOne({username: username}));
        return userDoc.checkPassword(password);
    }

    public async getByUsername(username: string): Promise<IUserDocument> {
        const userDoc = await mongoUser.connect().then(() => mongoUser.Users.findOne({username: username}));
        return userDoc.toJSON();
    }

    public async createUser(userDoc: IUserDocument): Promise<IUserDocument> {
        // mongo doesnt handle undefined.
        if (typeof(userDoc.roles) === 'undefined') {
            userDoc.roles = null;
        }
        return await mongoUser.connect().then(() => mongoUser.Users.create(userDoc));
    }

    public async updateUser(user: IUserDocument): Promise<IUserDocument> {
        const doc: UserSchema = await mongoUser.connect().then(() => mongoUser.Users.findOne(user._id));
        if (typeof(user.roles) === 'undefined') {
            user.roles = null;
        }
        doc.username = user.username;
        doc.password = user.password;
        doc.email = user.email;
        doc.name = user.name;
        doc.roles = user.roles;
        const saved = await doc.save((err: Error, u: UserSchema) => {
            if (err) {
                logger.error('Error updating User Profile: ' + err);
                throw err;
            }
            return u;
        });

        return saved;
    }
}
