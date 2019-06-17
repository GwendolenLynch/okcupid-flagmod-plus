// tslint:disable:object-literal-sort-keys
import { IProfileReport } from '../interfaces';
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
                    report: false,
                    enable: true,
                },
                {
                    name: 'ntu',
                    abbr: 'NTU',
                    label: 'Not The User',
                    comment: 'NTU',
                    vote: 1,
                    report: false,
                    enable: true,
                },
                {
                    name: 'ecu',
                    abbr: 'ECU',
                    label: 'Extreme Close-Up',
                    comment: 'ECU',
                    vote: 1,
                    report: false,
                    enable: true,
                },
                {
                    name: 'ris',
                    abbr: 'RIS',
                    label: 'Reverse Image Search',
                    comment: 'RIS',
                    vote: 1,
                    report: false,
                    enable: true,
                },
                {
                    name: 'unr',
                    abbr: 'UNR',
                    label: 'User Not Recognisable',
                    comment: 'UNR',
                    vote: 1,
                    report: false,
                    enable: true,
                },
                {
                    name: 'ftd',
                    abbr: 'FTD',
                    label: 'Filtered to Death',
                    comment: 'FTD',
                    vote: 1,
                    report: false,
                    enable: true,
                },
                {
                    name: 'fake',
                    abbr: 'Fake',
                    label: 'Fake, Spam, Scam, Bot',
                    comment: 'Fake',
                    vote: 1,
                    report: {
                        type: 1,
                        label: 3,
                    } as IProfileReport,
                    enable: true,
                },
                {
                    name: 'os',
                    abbr: 'OS',
                    label: 'Sexual/Nudity',
                    comment: 'OS',
                    vote: 11,
                    report: {
                        type: 1,
                        label: 2,
                    } as IProfileReport,
                    enable: true,
                },
            ] as IVoteOptions[],
            custom: [] as IVoteOptions[],
        },
        profile: new ProfileOptions(),
        settings_schema: schemaVersion,
    });
