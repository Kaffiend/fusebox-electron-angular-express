export class District {
    constructor(
        private quickCode: string,
        private description: string,
        private districtNumber: number,
        private sortSequence: number,
        private _id?: string
    ) {}

    get getDescription(): string {
        return this.description;
    }

    get getDistrictNumber(): number {
        return this.districtNumber;
    }

    get getSortSequence(): number {
        return this.sortSequence;
    }

    get getId(): string {
        return this._id;
    }
}
