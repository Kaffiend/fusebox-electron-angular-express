export const EndpointSchema = {
        stateId: Number,
        countyId: Number,
        stateAbbrevation: String,
        url: String,
        name: String,
        /**
         * TODO: Ian - Update to Enum
         */
        status: Number,
        hasCreditModule: Boolean,
        hasArchiveModule: Boolean,
        hasAccountsReceivableModule: Boolean,
        _id: String,
    
};

export class Endpoint {
    constructor(
        private stateId: number,
        private countyId: number,
        private stateAbbrevation: string,
        private url: string,
        private name: string,
        /**
         * TODO: Ian - Update to Enum
         */
        private status: number,
        private hasCreditModule: boolean,
        private hasArchiveModule: boolean,
        private hasAccountsReceivableModule: boolean,
        private _id?: string,
    ) { }

    public get getStateId(): number {
        return this.stateId;
    }

    public getCountyId(): number {
        return this.countyId;
    }

    public getStateAbbreviation(): string {
        return this.stateAbbrevation;
    }

    public get getUrl(): string {
        return this.url;
    }

    public get getName(): string {
        return this.name;
    }

    // needs to be updated to Enum.
    public get getStatus(): number {
        return this.status;
    }

    public get getHasCreditModule(): boolean {
        return this.hasCreditModule;
    }

    public get getHasArchiveModule(): boolean {
        return this.hasArchiveModule;
    }

    public getId(): string {
        return this._id;
    }

}
