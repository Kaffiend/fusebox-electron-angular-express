import { District } from './District';
export class CountyConfig {
    constructor(
        private configName: string,
        private countyName: string,
        private assessorName: string,
        private id?: string,
    ) {}

    get getConfigName(): string {
        return this.configName;
    }

    get getCountyName(): string {
        return this.countyName;
    }

    get getAssessorName(): string {
        return this.assessorName;
    }

    get getId(): string {
        return this.id;
    }
}

export interface ConfigAssessor extends CountyConfig {
    districts?: Array<District>;
}
