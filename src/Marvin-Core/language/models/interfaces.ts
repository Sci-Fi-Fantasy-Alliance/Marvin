export interface MarvinLanguage {
    data: MarvinLangData;
    refs: MarvinLangRefs;
}

export interface MarvinLangData {
    mentions: MarvinComList;
    random: MarvinComList;
}

export interface MarvinComList {
    comList: object;
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

export class MarvinComList implements MarvinComList {
    constructor(data: any) {
        this.comList = data.data;
    }
}
