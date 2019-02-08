import { VoteCollection } from '../../collection/vote-collection';
import { VoteOptions } from '../../entities/vote-options-entity';
import { IVoteOptions } from '../../schema-interfaces';

const standardButtonBody = 'tab-content-votes-standard-body';
const standardButtonRowTemplate = (vote: IVoteOptions) => `
<td><input type="checkbox" id="standard-${vote.name}-enable"></td>
<td id="standard-${vote.abbr}-abbr">${vote.abbr}</td>
<td id="standard-${vote.name}-label">${vote.label}</td>
<td>
<input type="text" id="standard-${vote.name}-comment" class="input" title="${vote.comment}" placeholder="${vote.abbr}">
</td>
`;

export class VotingStandardFields {
    public static read(): VoteCollection {
        const votes = new VoteCollection();
        const body = document.getElementById(standardButtonBody);
        if (!body) { throw Error(`Element ID "${standardButtonBody}" not found`); }
        [...body.getElementsByTagName('tr')].forEach((row: HTMLTableRowElement) => {
            votes.add(VotingStandardFields.get(row));
        });

        return votes;
    }

    public static write(votes: IVoteOptions[]): void {
        const tableBody = document.getElementById(standardButtonBody) as HTMLTableColElement;
        votes.forEach((vote: IVoteOptions, index: number) => {
            VotingStandardFields.addRow(tableBody, vote);
        });
    }

    private static get(row: HTMLTableRowElement): IVoteOptions {
        const vote = VoteOptions.create(row.id.replace('standard-', ''));
        const baseId = row.id;
        if (!document.getElementById(baseId)) { throw Error(`Unable to find row element ${row.id}`); }

        const enableElement = document.getElementById(`standard-${vote.name}-enable`) as HTMLInputElement;
        const commentElement = document.getElementById(`${baseId}-comment`) as HTMLInputElement;

        vote.enable = enableElement.checked;
        vote.comment = commentElement.value;

        return vote;
    }

    private static addRow(
        tableBody: HTMLTableColElement,
        vote: IVoteOptions,
    ): HTMLTableRowElement {
        const row = document.createElement('tr');
        row.id = `standard-${vote.name}`;
        row.innerHTML = standardButtonRowTemplate(vote);
        tableBody.appendChild(row);

        const enableElement = document.getElementById(`standard-${vote.name}-enable`) as HTMLInputElement;
        const commentElement = document.getElementById(`standard-${vote.name}-comment`) as HTMLInputElement;

        enableElement.checked = vote.enable;
        commentElement.value = vote.comment || vote.abbr;

        return row;
    }
}
