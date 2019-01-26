import { IProfile } from '../interfaces';

export class LastLogin {
    public static add(profile: IProfile): void {
        const profileElement = document.getElementById('profile2015') as HTMLDivElement;
        if (!profileElement) {
            return;
        }

        const lastLoginText = LastLogin.getLastLoginHtml(profile);
        LastLogin.basics(profileElement, lastLoginText);
        LastLogin.actionBar(profileElement, lastLoginText);
    }

    private static basics(profileElement: HTMLDivElement, lastLoginText: string): void {
        const lastLogin = document.createElement('div');
        lastLogin.setAttribute('class', 'is-size-6 userinfo2015-basics-asl');
        lastLogin.innerText = lastLoginText;

        const target = profileElement.getElementsByClassName('userinfo2015-basics')[0];
        if (!target) {
            return;
        }
        target.setAttribute('style', 'margin-top: 20px;');

        target.appendChild(lastLogin);
    }

    private static actionBar(profileElement: HTMLDivElement, lastLoginText: string): void {
        const actionBar = profileElement.getElementsByClassName('actionbar2015-info')[0];

        const lastLogin = document.createElement('div');
        lastLogin.setAttribute('class', 'is-size-6 actionbar2015-info-match');
        lastLogin.innerText = lastLoginText;

        actionBar.appendChild(lastLogin);

    }

    private static getLastLoginHtml(profile: IProfile): string {
        // tslint:disable:object-literal-sort-keys
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        };
        const date = new Date(profile.lastLogin * 1000)
            .toLocaleDateString(undefined, dateOptions);

        return `Last login: ${date}`;
    }
}
