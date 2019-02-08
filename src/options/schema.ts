// tslint:disable:object-literal-sort-keys
import { ProfileOptions } from './entities/profile-options-entity';
import { IOptions, IVoteOptions } from './schema-interfaces';

export const schemaVersion = 2;
export const schema = (): IOptions => ({
        voting: {
            standard: [
                {
                    name: 'nv',
                    abbr: 'NV/LA',
                    label: 'No Violation/Leave Alone',
                    comment: 'NV/LA',
                    vote: 0,
                    enable: true,
                },
                {
                    name: 'ntu',
                    abbr: 'NTU',
                    label: 'Not The User',
                    comment: 'NTU',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'ecu',
                    abbr: 'ECU',
                    label: 'Extreme Close-Up',
                    comment: 'ECU',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'ris',
                    abbr: 'RIS',
                    label: 'Reverse Image Search',
                    comment: 'RIS',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'unr',
                    abbr: 'UNR',
                    label: 'User Not Recognisable',
                    comment: 'UNR - User Not Recognisable',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'ftd',
                    abbr: 'FTD',
                    label: 'Filtered to Death',
                    comment: 'FTD - Filtered to Death',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'bot',
                    abbr: 'Bot',
                    label: 'Spam/scam Bot',
                    comment: 'Bot',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'sg',
                    abbr: 'SG',
                    label: 'Scammer Grammar',
                    comment: 'SG',
                    vote: 1,
                    enable: true,
                },
                {
                    name: 'os',
                    abbr: 'OS',
                    label: 'Sexual/Nudity',
                    comment: 'OS',
                    vote: 11,
                    enable: true,
                },
            ] as IVoteOptions[],
            custom: [] as IVoteOptions[],
        },
        profile: new ProfileOptions(),
        settings_schema: schemaVersion,
    });
