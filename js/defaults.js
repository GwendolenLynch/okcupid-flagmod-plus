'use strict';

class FlagmodPlusDefaults
{
    static get() {
        return {
            settings_schema: 1,
            buttons: {
                standard: [
                    {
                        label: 'No Violation/Leave Alone',
                        comment: 'NV/LA',
                        colour: 'green',
                        key: 'comment-nv-la',
                        vote: 0,
                    },
                    {
                        label: 'Not The User',
                        comment: 'NTU',
                        colour: 'blue',
                        key: 'comment-ntu',
                        vote: 1,
                    },
                    {
                        label: 'Scammer Grammar',
                        comment: 'SG',
                        colour: 'blue',
                        key: 'comment-scammer',
                        vote: 1,
                    },
                    {
                        label: 'Spam/scam Bot',
                        comment: 'Bot',
                        colour: 'blue',
                        key: 'comment-bot',
                        vote: 1,
                    },
                    {
                        label: 'Reverse Image Search',
                        comment: 'RIS',
                        colour: 'blue',
                        key: 'comment-ris',
                        vote: 1,
                    },
                    {
                        label: 'Extreme Close-Up',
                        comment: 'ECU',
                        colour: 'blue',
                        key: 'comment-ecu',
                        vote: 1,
                    },
                    {
                        label: 'Sexual/Nudity',
                        comment: 'OS',
                        colour: 'red',
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
        };
    }
}

