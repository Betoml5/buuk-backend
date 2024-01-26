import { Request } from "express";

declare namespace Express {
    export interface TUserJwt {
        id: number;
        role: {
            name: string;
        };
    }

    export interface Request {
        user?: TUserJwt;
    }
}

export type TUserJwt = {
    id: number;
    role: {
        name: string;
    };
};

export type TToken = {
    id: number;
    type: string;
};
export type TTimeline = {
    id: number;
    bookId: string;
    userId: number;
    pages: number;
    createdAt: Date;
    updatedAt: Date;
};

export type IBook = {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
};

export type IBookDetail = {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
};

export type AccessInfo = {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Epub;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
};

export type Epub = {
    isAvailable: boolean;
};

export type SaleInfo = {
    country: string;
    saleability: string;
    isEbook: boolean;
};

export type SearchInfo = {
    textSnippet: string;
};

export type VolumeInfo = {
    title: string;
    subtitle: string;
    authors: any[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: any[];
    readingModes: PanelizationSummary;
    pageCount: number;
    printType: string;
    categories: any[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

export type ImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
};

export type AccessInfo = {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: Epub;
    pdf: Epub;
    webReaderLink: string;
    accessViewStatus: string;
    quoteSharingAllowed: boolean;
};

export type Epub = {
    isAvailable: boolean;
};

export type SaleInfo = {
    country: string;
    saleability: string;
    isEbook: boolean;
};

export type VolumeInfo = {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
    printedPageCount: number;
    dimensions: Dimensions;
    printType: string;
    categories: string[];
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: PanelizationSummary;
    imageLinks: ImageLinks;
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
};

export type Dimensions = {
    height: string;
    width: string;
    thickness: string;
};

export type ImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    extraLarge: string;
};

export type IndustryIdentifier = {
    type: string;
    identifier: string;
};

export type PanelizationSummary = {
    containsEpubBubbles: boolean;
    containsImageBubbles: boolean;
};

export type ReadingModes = {
    text: boolean;
    image: boolean;
};
