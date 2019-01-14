import { IOptions } from './interfaces';

// tslint:disable
export const defaults = {
    settings_schema: 1,
    buttons: {
        standard: [
            {
                label: 'No Violation/Leave Alone',
                comment: 'NV/LA',
                key: 'comment-nv-la',
                vote: 0,
            },
            {
                label: 'Not The User',
                comment: 'NTU',
                key: 'comment-ntu',
                vote: 1,
            },
            {
                label: 'Extreme Close-Up',
                comment: 'ECU',
                key: 'comment-ecu',
                vote: 1,
            },
            {
                label: 'Reverse Image Search',
                key: 'comment-ris',
                comment: 'RIS',
                vote: 1,
            },
            {
                label: 'Spam/scam Bot',
                comment: 'Bot',
                key: 'comment-bot',
                vote: 1,
            },
            {
                label: 'Scammer Grammar',
                comment: 'SG',
                key: 'comment-scammer',
                vote: 1,
            },
            {
                label: 'Sexual/Nudity',
                comment: 'OS',
                key: 'comment-os',
                vote: 11,
            },
        ],
        custom: [
            {
                enable: false,
                vote: 1,
                label: '',
                comment: '',
            },
            {
                enable: false,
                vote: 1,
                label: '',
                comment: '',
            },
            {
                enable: false,
                vote: 1,
                label: '',
                comment: '',
            },
            {
                enable: false,
                vote: 1,
                label: '',
                comment: '',
            },
        ],
    },
    profile: {
        last_login: true,
        review_panel: true,
    },
} as IOptions;
