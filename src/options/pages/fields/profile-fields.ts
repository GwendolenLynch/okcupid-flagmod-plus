import { ProfileOptions } from '../../entities/profile-options-entity';
import { schema } from '../../schema';
import { IProfileOptions } from '../../schema-interfaces';

export class ProfileFields {
    public static read(): ProfileOptions {
        const profile = schema().profile as unknown as IProfileOptions;
        const review = document.getElementById('profile-enable-review') as HTMLInputElement;

        profile.review_panel = Boolean(review.checked);

        return profile;
    }

    public static write(profile: IProfileOptions): void {
        const review = document.getElementById('profile-enable-review') as HTMLInputElement;

        review.checked = profile.review_panel;
    }
}
