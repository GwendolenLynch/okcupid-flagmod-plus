import { IProfileReport } from '../interfaces';

export interface IOptions {
    voting: IVotingOptions;
    profile: IProfileOptions;
    settings_schema: number;
}

export interface IProfileOptions {
    last_login: boolean;
    review_panel: boolean;
}

export interface IVotingOptions {
    standard: IVoteOptions[];
    custom: IVoteOptions[];
}

export interface IVoteOptions {
    name: string;
    abbr: string;
    label: string;
    comment: string;
    vote: number;
    report: IProfileReport | false;
    enable: boolean;
}
