/**
 * Voting replacement form.
 */
import { IOptionButtonCustom, IOptionButtonStandard } from '../interfaces';

export class VotingForm {
    public form: HTMLFormElement;

    public constructor() {
        this.form = document.getElementById('flagmodform') as HTMLFormElement;
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

    public create(html: string): HTMLElement | null {
        const userId = document.querySelector('input[name="userid"') as HTMLInputElement;
        const objectId = document.querySelector('input[name="objectid"') as HTMLInputElement;

        this.form.innerHTML = html;

        const formUserId = document.querySelector('input[name="userid"') as HTMLInputElement;
        const formObjectId = document.querySelector('input[name="objectid"') as HTMLInputElement;

        formUserId.value = userId.value;
        formObjectId.value = objectId.value;

        return this.form;
    }

    public addButtons(buttons: IOptionButtonStandard[]): void {
        const div = this.form.querySelector('#flagmod_plus_quick_vote') as HTMLElement;

        buttons.forEach((buttonConfig) => {
            VotingForm.createButton(buttonConfig, div);
        });
    }

    public addButtonsCustom(buttons: IOptionButtonCustom[]): void {
        const div = this.form.querySelector('#flagmod_plus_custom_vote') as HTMLElement;
        let unhidden = false;

        buttons.forEach((buttonConfig) => {
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

    private static createButton(config: IOptionButtonCustom | IOptionButtonStandard, div: HTMLElement): void {
        const button = document.createElement('button');
        const colour = VotingForm.getButtonColour(parseInt(String(config.vote), 10));

        button.setAttribute('type', 'button');
        button.setAttribute('class', `flatbutton ${colour}`);
        button.setAttribute('data-vote', String(config.vote));
        button.setAttribute('data-comment', config.comment);
        button.setAttribute('title', config.comment);
        button.innerText = config.label;

        div.appendChild(button);
    }

    private static getButtonColour(vote: number ): string {
        if (vote === 1) { return 'blue'; }
        if (vote === 11) { return 'red'; }

        return 'green';
    }
}
