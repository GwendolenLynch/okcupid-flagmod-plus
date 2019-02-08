import { hosts } from '../../hosts';
import { IProfile } from '../../interfaces';

export class ButtonEventHandler {
    private readonly button: HTMLButtonElement;
    private readonly input: HTMLInputElement;
    private readonly profile: { userid: string };
    private readonly token: string;

    public constructor(button: HTMLButtonElement, input: HTMLInputElement, profile: IProfile, token: string) {
        this.button = button;
        this.input = input;
        this.profile = profile;
        this.token = token;
    }

    public onClick(event: MouseEvent): void {
        this.button.classList.add('is-loading');
        if (this.button.parentElement) {
            this.button.parentElement.setAttribute('disabled', 'disabled');
            [...this.button.parentElement.getElementsByTagName('button')].forEach((element) => {
                element.setAttribute('disabled', 'disabled');
            });
        }
        this.input.setAttribute('disabled', 'disabled');

        this.report();

    }

    private async report(): Promise<void> {
        const request = new Request(
            `${hosts.okCupid.profileApi}/${this.profile.userid}/report`,
            {
                body: JSON.stringify({
                    comment: this.input.value,
                    id: this.button.getAttribute('data-objectId'),
                    label: this.button.getAttribute('data-label'),
                    source: 'photo',
                    type: 0,
                    userid: this.button.getAttribute('data-userId'),
                }),
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'authorization': `Bearer ${this.token}`,
                    'x-okcupid-platform': 'DESKTOP',
                    'x-requested-with': 'XMLHttpRequest',
                }),
                method: 'POST',
                redirect: 'follow',
            },
        );

        fetch(request)
            .then(async (response: Response) => response.json())
            .then((json: JSON) => {
                this.button.classList.remove('is-loading');
                this.button.innerText = '✔';
            })
            .catch((response) => {
                this.button.innerText = '💥';
                console.error('FlagmodPlus Error', response);
            });
    }
}
