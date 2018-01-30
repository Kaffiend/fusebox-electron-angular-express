import { injectable, inject } from 'inversify';
import { User } from '../model/User';
import { IUserDocument, UserSchema } from '../model/UserSchema';
// User Repo import here..
import { UserRepository } from '../repository/UserRepository';
import { TYPES } from '../types';
import 'reflect-metadata';
import * as _ from 'lodash';

export interface UserService {
    getUser(id: string): Promise<User>;
    getByUsername(username: string): Promise<User>;
    createUser(user: User): Promise<User>;
    validateUser(username: string, password: string): Promise<boolean>;
}

@injectable()
export class UserServiceImpl implements UserService {
    @inject(TYPES.UserRepository)
    private userRepositoryMongo: UserRepository;

    public async getUser(id: string): Promise<User> {
        let user: IUserDocument = await this.userRepositoryMongo.findOne(id).then((u) => {
            return this.toUser(u);
        });
        return user;
    }

    public async validateUser(username: string, password: string): Promise<boolean> {
        return await this.userRepositoryMongo.validate(username, password);
    }

    public async getByUsername(username: string): Promise<User> {
        let user = await this.userRepositoryMongo.getByUsername(username).then((u) => {
            return this.toUser(u);
        });
        return user;
    }

    public async createUser(user): Promise<User> {
        const userDTO = this.toUserDoc(user);
        
        const createdDoc: IUserDocument = await this.userRepositoryMongo.createUser(userDTO);

        return this.toUser(createdDoc);
    }

    private toUserDoc(user: User): IUserDocument {
        return new User(
            user.username,
            user.name,
            user.email,
            user.roles,
            user._id,
            user.password
        );
    }

    private toUser(userDoc: IUserDocument): User {
        return {
            username: userDoc.username,
            name: userDoc.name,
            email: userDoc.email,
            roles: userDoc.roles,
            _id: userDoc._id
        };
    }
}
