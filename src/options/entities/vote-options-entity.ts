import { schema } from '../schema';
import { IVoteOptions } from '../schema-interfaces';

export class VoteOptions implements IVoteOptions {
    public name: string;
    public abbr: string;
    public label: string;
    public comment: string;
    public vote: number;
    public enable: boolean;

    public constructor(
        name: string,
        abbr: string,
        label: string,
        comment: string,
        vote: number,
        enable: boolean,
    ) {
        this.name = name;
        this.abbr = abbr;
        this.comment = comment;
        this.label = label;
        this.vote = vote;
        this.enable = enable;
    }

    public static create(name: string): VoteOptions {
        if (name === 'custom') {
            return new VoteOptions('', '', '', '', 1, false);
        }
        const v = schema().voting.standard
            .find((vote: IVoteOptions) => vote.name === name);
        if (!v) { throw Error(`Unable to create a standard button called ${name}`); }

        return new VoteOptions(v.name, v.abbr, v.label, v.comment, v.vote, v.enable);
    }
}
