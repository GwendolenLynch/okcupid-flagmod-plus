export interface IOptionButtonStandard {
    label: string;
    comment: string;
    key: string;
    vote: number;
}

export interface IOptionButtonCustom {
    enable: boolean;
    vote: number;
    label: string;
    comment: string;
}

export interface IOptions {
    settings_schema: 1;
    buttons: {
        standard: IOptionButtonStandard[],
        custom: IOptionButtonCustom[],
    };
    profile: {
        last_login: boolean;
        review_panel: boolean;
    };
}

export interface IProfile {
    blocked: boolean;
    bookmarked: boolean;
    currentUserThumb: string;
    details: [{}];
    displayname: string;
    essays: [{}];
    firstMessage: null | boolean;
    isLoggedIn: boolean;
    lastLogin: number;
    likes: {
        mutual_like_vote: number,
        recycled: number,
        passed_on: number,
        they_like: number | null,
        you_like: number,
        vote: {
            fed: number,
            fwd_timestamp: number,
            rev: number,
            rev_timestamp: number,
        },
    };
    mobileMessageLink: string;
    percentages: {
        match: number,
        enemy: number,
    };
    photos: [{
        '60x60': string,
        '82x82': string,
        '100x100': string,
        '120x120': string,
        '160x160': string,
        '225x225': string,
        '383x383': string,
        '400x400': string,
        '800x800': string,
        info: IProfilePhotoMeta,
    }];
    showNoPhotosBlock: boolean;
    userInstructions: {
        intro: IOcsMessaging;
        ocsMessagingLikeEssay: IOcsMessaging;
        ocsMessagingLikePhoto: IOcsMessaging;
        ocsMessagingLikeProfile: IOcsMessaging;
        ocsMessagingMessageEssay: IOcsMessaging;
        ocsMessagingMessageLater: IOcsMessaging;
        ocsMessagingMessagePhoto: IOcsMessaging;
        ocsMessagingMessageProfile: IOcsMessaging;
        ocsMessagingSentMessage: IOcsMessaging;
        ocsPassPreviouslyLiked: IOcsMessaging;
        ocsPassedOn: IOcsMessaging;
        unmatch: IOcsMessaging;
    };
    userid: string;
    username: string;
}

export interface IOcsMessaging {
    body: string;
    id: string;
    title: string;
}

export interface IProfilePhotoMeta {
    caption: string;
    has_photos: boolean;
    height: number;
    lower_right_x: number;
    lower_right_y: number;
    ordinal: number;
    path: string;
    picid: string;
    thumbnail: string;
    type: number;
    upper_left_x: number;
    upper_left_y: number;
    when_taken: number;
    when_uploaded: number;
    width: number;
}
