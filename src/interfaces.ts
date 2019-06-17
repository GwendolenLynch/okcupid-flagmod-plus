export interface IProfile {
    blocked: boolean;
    bookmarked: boolean;
    currentUserThumb: string;
    details: [{}];
    displayname: string;
    essays: IEssay[];
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

export interface IEssay {
    clean_content: string;
    content: string;
    contents: string;
    essay_groupid: number;
    essay_pics: IEssayPicture[];
    essayid: 12;
    group_type: number;
    id: number;
    placeholder: string;
    raw_content: string;
    rawtext: string;
    sectionTitle: string;
    title: string;
}

export interface IEssayPicture {
    offset: number;
    picid: string;
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

export interface IButtonMeta {
    id: string;
    text: string;
    class: string;
    comment: string;
    label: number;
    type: number;
    report: IProfileReport | false;
}

/**
 * POST submissions for flagging profiles
 */
export interface IProfileReport {
    userId: string;
    type: number;
    label: number;    // 1: aggressive, 2: sexual, 3: fake, 4: underage, 5: violent, 6: other
    comment: string;
    id: string;
}

/**
 * POST submissions for flagging photos
 */
export interface IImageReport {
    type: number;
    source: string;
    label: number;
    userId: string;
    id: string;
    comment: string;
}
