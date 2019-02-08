import { IVoteOptions } from '../schema-interfaces';

export class VoteCollection {
    private _votes: IVoteOptions[] = [];

    public add(vote: IVoteOptions): void {
        if (!vote.label && !vote.comment) { return; }
        this._votes.push(vote);
    }

    public remove(label: string): void {
        this._votes.filter((vote) => vote.label !== '');
    }

    public get votes(): IVoteOptions[] {
        return this._votes;
    }

    public set votes(value: IVoteOptions[]) {
        this._votes = value;
    }
}
