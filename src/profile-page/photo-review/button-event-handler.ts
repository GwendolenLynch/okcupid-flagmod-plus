import { IProfile, IProfileReport } from '../../interfaces';
import { ImageReport } from '../../report/image-report';
import { ProfileReport } from '../../report/profile-report';
import { Report } from '../../report/report';

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

    public async onClick(event: MouseEvent): Promise<void> {
        this.button.classList.add('is-loading');
        if (this.button.parentElement) {
            this.button.parentElement.setAttribute('disabled', 'disabled');
            [...this.button.parentElement.getElementsByTagName('button')].forEach((element) => {
                element.setAttribute('disabled', 'disabled');
            });
        }
        this.input.setAttribute('disabled', 'disabled');

        Report
            .submit(this.token, this.getImageReport())
            .then(() => {
                this.button.classList.remove('is-loading');
                this.button.innerText = '✔';
            })
            .then(() => {
                if (!this.button.hasAttribute('data-report-profile')) { return; }
                const options = JSON.parse(String(this.button.getAttribute('data-report-profile'))) as IProfileReport;

                return Report.submit(this.token, this.getProfileReport(options));
            })
            .catch((response) => {
                this.button.innerText = '💥';
                console.error('FlagmodPlus Error', response);
            });
    }

    private getImageReport(): ImageReport {
        return new ImageReport(
            Number(this.button.getAttribute('data-label')),
            this.button.getAttribute('data-userId') as string,
            this.button.getAttribute('data-objectId') as string,
            this.input.value,
        );
    }

    private getProfileReport(options: IProfileReport): ProfileReport {
        return new ProfileReport(
            Number(options.label),
            this.button.getAttribute('data-userId') as string,
            this.button.getAttribute('data-userId') as string,
            '',
        );
    }
}
