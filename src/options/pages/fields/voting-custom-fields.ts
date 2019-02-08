import { VoteCollection } from '../../collection/vote-collection';
import { VoteOptions } from '../../entities/vote-options-entity';
import { IVoteOptions } from '../../schema-interfaces';

const customButtonRowTemplate = (buttonId): string => `
<td><input type="checkbox" id="custom-${buttonId}-enable"></td>
<td>
    <select id="custom-${buttonId}-vote">
        <option value="1">&#x274C;</option>
        <option value="0">&#x2713;</option>
    </select>
</td>
<td><input type="text" id="custom-${buttonId}-label" class="input" required></td>
<td><input type="text" id="custom-${buttonId}-comment" class="input"></td>
`;

export class VotingCustomFields {
    public static add(): HTMLTableRowElement {
        const tableBody = document.getElementById('tab-content-votes-custom-body') as HTMLTableColElement;
        // tslint:disable:object-literal-sort-keys
        const vote = VoteOptions.create('custom');

        return VotingCustomFields.addRow(tableBody, vote, tableBody.childNodes.length);
    }

    public static read(): VoteCollection {
        const votes = new VoteCollection();
        const body = document.getElementById('tab-content-votes-custom-body');
        if (!body) { throw Error('Element ID "tab-content-votes-custom-body" not found'); }
        [...body.getElementsByTagName('tr')].forEach((row: HTMLTableRowElement) => {
            votes.add(VotingCustomFields.get(row));
        });

        return votes;
    }

    public static write(votesCustom: IVoteOptions[]): void {
        const tableBody = document.getElementById('tab-content-votes-custom-body') as HTMLTableColElement;
        votesCustom.forEach((vote: IVoteOptions, index: number) => {
            VotingCustomFields.addRow(tableBody, vote, index);
        });

        const addButton = document.getElementById('custom-row-add');
        if (!addButton) { return; }
        addButton.addEventListener('click', VotingCustomFields.add);
    }

    private static get(row: HTMLTableRowElement): IVoteOptions {
        const vote = VoteOptions.create('custom');
        const baseId = row.id;
        if (!document.getElementById(baseId)) { throw Error(`Unable to find row element ${row.id}`); }

        const enableElement = document.getElementById(`${baseId}-enable`) as HTMLInputElement;
        const voteElement = document.getElementById(`${baseId}-vote`) as HTMLInputElement;
        const labelElement = document.getElementById(`${baseId}-label`) as HTMLInputElement;
        const commentElement = document.getElementById(`${baseId}-comment`) as HTMLInputElement;

        vote.enable = enableElement.checked;
        vote.vote = Number(voteElement.value);
        vote.label = labelElement.value;
        vote.comment = commentElement.value;

        return vote;
    }

    private static addRow(
        tableBody: HTMLTableColElement,
        vote: IVoteOptions,
        index: number,
    ): HTMLTableRowElement {
        const row = document.createElement('tr');
        row.id = `custom-${index}`;
        row.innerHTML = customButtonRowTemplate(String(index));
        tableBody.appendChild(row);

        const enableElement = document.getElementById(`custom-${index}-enable`) as HTMLInputElement;
        const voteElement = document.getElementById(`custom-${index}-vote`) as HTMLInputElement;
        const labelElement = document.getElementById(`custom-${index}-label`) as HTMLInputElement;
        const commentElement = document.getElementById(`custom-${index}-comment`) as HTMLInputElement;

        enableElement.checked = vote.enable;
        voteElement.value = String(vote.vote);
        labelElement.value = vote.label;
        commentElement.value = vote. comment || vote.abbr;

        return row;
    }
}
