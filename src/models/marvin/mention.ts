export interface MarvinLanguage {
    data: Data;
    refs: Refs;
}

export interface Data {
    mentions: Mentions;
}

export interface Mentions {
    rngList: string[];
}

export interface Refs {}

export class MentionMessage {
    public rngList: string[];
    public constructor(data?: Mentions) {
        this.rngList = data.rngList;
    }
}
