import {
  Core,
  Model,
  Instance,
  Collection,
  Index,
  Property,
  Transform,
  Validate,
  ObjectID,
  Configuration
} from 'iridium';
import * as _ from 'lodash';
import { User } from './User';

export interface IUserDocument {
  _id?: string;
  username: string;
  password?: string;
  name: IName;
  email: string;
  roles?: IRole[];
}

export interface IName {
  last: string;
  first: string;
  middle: string;
}

export interface IRole {
  key: string;
  value: boolean;
  type: string;
}

@Collection('users')
@Index({ username: 1 }, { unique: true })
@Index({ email: 1 }, { unique: true })
@Validate('password', function(schema, data, path) {
  // This should use something like zxcvbn to determine whether a password
  // is strong enough for your use case.
  return this.assert(
    typeof data === 'string' && /^.{8,}$/.test(data),
    'Expected password to be at least 8 characters long.'
  );
})
export class UserSchema extends Instance<IUserDocument, UserSchema> {
  @ObjectID _id: string;
  @Property(String) username: string;
  @Property('password') password: string;
  @Property({
    last: String,
    first: String,
    middle: String
  })
  name: {
    last: string;
    first: string;
    middle: string;
  };
  @Property(/^.+@.+$/)
  email: string;
  @Property([{ key: String, type: String, value: Boolean }], false)
  roles: { key: string; type: string; value: boolean }[];

  public static onCreating(user: IUserDocument) {
    var passwordTest = /(?=^.{8,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;

    if (!passwordTest.test(user.password || ''))
      return Promise.reject(
        new Error(
          'Password didn\'t meet the minimum safe password requirements. Passwords should be at least 8 characters long, and contain at least 3 of the following categories: lowercase letters, uppercase letters, numbers, characters'
        )
      );

    user.password = require('crypto')
      .createHash('sha512')
      .update('746327753')
      .update(user.password)
      .digest('hex');
  }

  public setPassword(newPassword: string, callback: (err?: Error, user?: UserSchema) => void) {
    /// <summary>Updates the user's stored password hash</summary>
    /// <param name="newPassword" type="String">The new password to use for the user</param>
    /// <param name="callback" type="Function">A function to be called once the user's password has been updated</param>
    var passwordTest = /(?=^.{8,}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*/;
    if (!passwordTest.test(newPassword || ''))
      return callback(
        new Error(
          'Password didn"t meet the minimum safe password requirements. Passwords should be at least 8 characters long, and contain at least 3 of the following categories: lowercase letters, uppercase letters, numbers, characters'
        )
      );

    var hashed = require('crypto')
      .createHash('sha512')
      .update('746327753')
      .update(newPassword)
      .digest('hex');
    this.password = hashed;
    this.save(callback);
  }
  public checkPassword(password: string): boolean {
    /// <summary>Checks whether a given password is correct for a user's account</summary>
    /// <param name="password" type="String">The password to validate against the user's password hash.</param>
    /// <returns type="Boolean"/>
    var hashed = require('crypto')
      .createHash('sha512')
      .update('746327753')
      .update(password)
      .digest('hex');
    return hashed === this.password;
  }
}

class UserDatabase extends Core {
  public Users = new Model<IUserDocument, UserSchema>(this, UserSchema);
}

let initUser = new UserDatabase({ database: 'test_db' });
initUser.connect().then(() => {
  initUser.Users.count().then(count => {
    if (count < 1) {
      initUser.Users.create([
        new User('ianm',{ first: 'Ian', middle: 'T', last: 'Mackie' }, 'ianm@completesystemsupport.com', [], null,'test'
        ),
        new User('kevinc', { first: 'Kevin', middle: 'J', last: 'Carson' }, 'kevin@kofile.us', [], null, 'p@ssw0rd')
      ]);
    }
  });
  initUser.Users.ensureIndexes();
});

export const mongoUser = new UserDatabase({ database: 'test_db' });
