import { ProfileOptions } from '../../entities/profile-options-entity';
import { schema } from '../../schema';
import { IProfileOptions } from '../../schema-interfaces';

export class ProfileFields {
    public static read(): ProfileOptions {
        const profile = schema().profile as unknown as IProfileOptions;
        const lastLogin = document.getElementById('profile-enable-last-login') as HTMLInputElement;
        const review = document.getElementById('profile-enable-review') as HTMLInputElement;

        profile.last_login = Boolean(lastLogin.checked);
        profile.review_panel = Boolean(review.checked);

        return profile;
    }

    public static write(profile: IProfileOptions): void {
        const lastLogin = document.getElementById('profile-enable-last-login') as HTMLInputElement;
        const review = document.getElementById('profile-enable-review') as HTMLInputElement;

        lastLogin.checked = profile.last_login;
        review.checked = profile.review_panel;
    }
}
