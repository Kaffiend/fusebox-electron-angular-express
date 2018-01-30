export class User {
    constructor(
        public username: string,
        public name: Name,
        public email: string,
        public roles?: Role[],
        public _id?: string,
        public password?: string,
    ) {}
}

export class Name {
    constructor(
        public last: string,
        public first: string,
        public middle: string
    ) {}
}

export class Role {
    constructor(
        public key: string,
        public value: boolean,
        public type: string
    ) {}
}

export interface TrackedUser {
    socketId: string;
    user: User;
}
