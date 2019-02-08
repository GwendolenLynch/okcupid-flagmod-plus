/**
 * Voting replacement voting.
 */
import { browser } from 'webextension-polyfill-ts';

import { IProfileOptions, IVoteOptions, IVotingOptions } from '../options/schema-interfaces';

export class VotingForm {
    public form: HTMLFormElement;
    private readonly voting: IVotingOptions;
    private readonly profile: IProfileOptions;

    public constructor(voting: IVotingOptions, profile: IProfileOptions) {
        this.voting = voting;
        this.profile = profile;
        this.form = document.getElementById('flagmodform') as HTMLFormElement;
    }

    public async render(): Promise<void> {
        return await fetch(browser.runtime.getURL('html/form/flagmod-vote-buttons.html'))
            .then(async (response: Response) => response.text())
            .then((formHtml: string) => {
                this.build(formHtml);
                this.addButtons();
                this.addButtonsCustom();
                this.addListeners();
            });
    }

    public addListeners(): void {
        if (!this.form) { throw Error('Form "flagmodform" not found'); }
        const buttons = this.form.querySelectorAll('button[type="button"]');

        buttons.forEach((button) => {
            button.addEventListener('click', (event: Event) => this.submit(event as MouseEvent));
        });
    }

    public submit(event: MouseEvent): void {
        const target = event.target as HTMLButtonElement;
        if (!target) { throw Error('Event target is empty'); }
        event.preventDefault();

        const vote = target.getAttribute('data-vote') as string;
        const commentInput = document.getElementById('comment') as HTMLInputElement;

        if (target.hasAttribute('data-comment')) {
            const comment = commentInput.value ? ` ${commentInput.value}` : '';
            commentInput.innerText = `${target.getAttribute('data-comment')}${comment}`;
        }
        const voteType = document.getElementById('voteType') as HTMLInputElement;
        voteType.value = vote;

        this.form.submit();
    }

    public build(html: string): HTMLElement | null {
        const userId = document.querySelector('input[name="userid"') as HTMLInputElement;
        const objectId = document.querySelector('input[name="objectid"') as HTMLInputElement;

        this.form.innerHTML = html;

        const formUserId = document.querySelector('input[name="userid"') as HTMLInputElement;
        const formObjectId = document.querySelector('input[name="objectid"') as HTMLInputElement;

        formUserId.value = userId.value;
        formObjectId.value = objectId.value;

        return this.form;
    }

    public addButtons(): void {
        const div = this.form.querySelector('#flagmod_plus_quick_vote') as HTMLElement;

        this.voting.standard.forEach((button) => {
            if (button.enable) { VotingForm.createButton(button, div); }
        });
    }

    public addButtonsCustom(): void {
        const div = this.form.querySelector('#flagmod_plus_custom_vote') as HTMLElement;
        let unhidden = false;

        this.voting.custom.forEach((buttonConfig) => {
            if (buttonConfig.enable) {
                unhidden = true;
                VotingForm.createButton(buttonConfig, div);
            }
        });
        if (unhidden) {
            const voteCustom = this.form.querySelector('#vote_custom') as HTMLElement;
            voteCustom.removeAttribute('hidden');
        }
    }

    private static createButton(config: IVoteOptions, div: HTMLElement): void {
        const button = document.createElement('button');
        const colour = VotingForm.getButtonColour(parseInt(String(config.vote), 10));

        button.setAttribute('type', 'button');
        button.setAttribute('class', `flatbutton ${colour}`);
        button.setAttribute('data-vote', String(config.vote));
        button.setAttribute('data-comment', config.comment || config.abbr);
        button.setAttribute('title', config.comment || config.abbr);
        button.innerText = config.label;

        div.appendChild(button);
    }

    private static getButtonColour(vote: number): string {
        if (vote === 1) { return 'blue'; }
        if (vote === 11) { return 'red'; }

        return 'green';
    }
}
