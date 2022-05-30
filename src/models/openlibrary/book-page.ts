export interface BookPage {
    description: string;
    links: BookLink[];
    title: string;
    covers: number[];
    subjects: string[];
    key: string;
    authors: BookAuthor[];
    type: BookKeyType;
    latest_revision: number;
    revision: number;
    created: BookDate;
    last_modified: BookDate;
}

export interface BookAuthor {
    author: BookKeyType;
    type: BookKeyType;
}

export interface BookKeyType {
    key: string;
}

export interface BookDate {
    type: string;
    value: string;
}

export interface BookLink {
    title: string;
    url: string;
    type: BookKeyType;
}
