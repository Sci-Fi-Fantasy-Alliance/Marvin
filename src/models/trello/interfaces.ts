export interface TrelloCard {
    id?: string;
    badges?: Badges;
    checkItemStates?: null;
    closed?: boolean;
    dueComplete?: boolean;
    dateLastActivity?: string;
    desc: string;
    descData?: DescData | null;
    due?: null;
    dueReminder?: null;
    email?: null;
    idBoard?: IDBoard | string;
    idChecklists?: any[];
    idList?: string;
    idMembers?: string[];
    idMembersVoted?: any[];
    idShort?: number;
    idAttachmentCover?: null;
    labels?: Label[];
    idLabels?: string[];
    manualCoverAttachment?: boolean;
    name: string;
    pos?: number;
    shortLink?: string;
    shortUrl?: string;
    start?: null;
    subscribed?: boolean;
    url?: string;
    cover?: Cover;
    isTemplate?: boolean;
    cardRole?: null;
}

export interface Badges {
    attachmentsByType: AttachmentsByType;
    location: boolean;
    votes: number;
    viewingMemberVoted: boolean;
    subscribed: boolean;
    fogbugz: string;
    checkItems: number;
    checkItemsChecked: number;
    checkItemsEarliestDue: null;
    comments: number;
    attachments: number;
    description: boolean;
    due: null;
    dueComplete: boolean;
    start: null;
}

export interface AttachmentsByType {
    trello: TrelloInfo;
}

export interface TrelloInfo {
    board: number;
    card: number;
}

export interface Cover {
    idAttachment: null;
    color: null;
    idUploadedBackground: null;
    size: string;
    brightness: string;
    idPlugin: null;
}

export interface DescData {
    emoji: Emoji;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Emoji {}

export enum IDBoard {
    SFFA = '624f419705d588375c170bc1',
}

export interface Label {
    id: string;
    idBoard: IDBoard;
    name: string;
    color: null | string;
}

export interface TrelloBoardList {
    id: string;
    name: string;
    closed: boolean;
    idBoard: string;
    pos: number;
    subscribed: boolean;
    softLimit: null;
}

export interface TrelloBoard {
    id: string;
    name: string;
    desc: string;
    descData: null;
    closed: boolean;
    idOrganization: string;
    idEnterprise: null;
    pinned: boolean;
    url: string;
    shortUrl: string;
    prefs: Prefs;
    labelNames: LabelNames;
}

export interface LabelNames {
    green: string;
    yellow: string;
    orange: string;
    red: string;
    purple: string;
    blue: string;
    sky: string;
    lime: string;
    pink: string;
    black: string;
}

export interface Prefs {
    permissionLevel: string;
    hideVotes: boolean;
    voting: string;
    comments: string;
    invitations: string;
    selfJoin: boolean;
    cardCovers: boolean;
    isTemplate: boolean;
    cardAging: string;
    calendarFeedEnabled: boolean;
    hiddenPluginBoardButtons: any[];
    background: string;
    backgroundColor: null;
    backgroundImage: string;
    backgroundImageScaled: BackgroundImageScaled[];
    backgroundTile: boolean;
    backgroundBrightness: string;
    backgroundBottomColor: string;
    backgroundTopColor: string;
    canBePublic: boolean;
    canBeEnterprise: boolean;
    canBeOrg: boolean;
    canBePrivate: boolean;
    canInvite: boolean;
}

export interface BackgroundImageScaled {
    width: number;
    height: number;
    url: string;
}
