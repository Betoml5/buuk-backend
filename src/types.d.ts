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

export type TBook = {
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: VolumeInfo;
    saleInfo: SaleInfo;
    accessInfo: AccessInfo;
    searchInfo: SearchInfo;
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
    acsTokenLink: string;
};

export type SaleInfo = {
    country: string;
    saleability: string;
    isEbook: boolean;
    listPrice: SaleInfoListPrice;
    retailPrice: SaleInfoListPrice;
    buyLink: string;
    offers: Offer[];
};

export type SaleInfoListPrice = {
    amount: number;
    currencyCode: string;
};

export type Offer = {
    finskyOfferType: number;
    listPrice: OfferListPrice;
    retailPrice: OfferListPrice;
    giftable: boolean;
};

export type OfferListPrice = {
    amountInMicros: number;
    currencyCode: string;
};

export type SearchInfo = {
    textSnippet: string;
};

export type VolumeInfo = {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: Date;
    description: string;
    industryIdentifiers: IndustryIdentifier[];
    readingModes: ReadingModes;
    pageCount: number;
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

export type ImageLinks = {
    smallThumbnail: string;
    thumbnail: string;
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
