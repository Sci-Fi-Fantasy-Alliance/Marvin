export interface MarvinLanguage {
    data: MarvinLangData;
    refs: MarvinLangRefs;
}

export interface MarvinLangData {
    mentions: MarvinMentions;
}

export interface MarvinMentions {
    rngList: string[];
}

export interface MarvinLangRefs {
    favorites: MarvinFavorites;
}

export interface MarvinFavorites {
    number: string;
    color: string;
    song: MarvinFavoriteSong;
}

export interface MarvinFavoriteSong {
    trackName: string;
    author: string;
    url: string;
}

export class MentionMessage {
    public rngList: string[];
    public constructor(data?: MarvinMentions) {
        this.rngList = data.rngList;
    }
}
