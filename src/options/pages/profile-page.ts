import { browser } from 'webextension-polyfill-ts';
import { IProfileOptions } from '../schema-interfaces';

import { ProfileFields } from './fields/profile-fields';

export class ProfilePage {
    public static async render(): Promise<void> {
            return await browser.storage.sync.get('profile')
                // tslint:disable-next-line:no-unsafe-any
                .then((response) => response.profile)
                .then((profile: IProfileOptions) => { ProfileFields.write(profile); });
    }
}
