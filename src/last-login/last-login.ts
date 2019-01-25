import { IProfile } from '../interfaces';

export class LastLogin {
    public static add(profile: IProfile): void {
        const profileElement = document.getElementById('profile2015');
        if (!profileElement) { return; }

        const target = profileElement.getElementsByClassName('userinfo2015-basics')[0];
        if (!target) { return; }

        const lastLogin = document.createElement('div');
        lastLogin.setAttribute('class', 'is-size-6 userinfo2015-basics-asl');
        lastLogin.innerText = LastLogin.getLastLoginHtml(profile);

        target.setAttribute('style', 'margin-top: 20px;');
        target.appendChild(lastLogin);
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
