import { browser } from 'webextension-polyfill-ts';

import { IOptions } from '../options/schema-interfaces';

import { FlagmodPlusInstaller } from '../background/installer';
import { IProfile } from '../interfaces';
import { Lightbox } from './lightbox';
import { VotingComments } from './voting-comments';
import { VotingForm } from './voting-form';
import { VotingImage } from './voting-image';

export class FlagmodPlus {
    public static async load(profile: IProfile): Promise<void> {
        const config = await FlagmodPlus.config();
        await new VotingForm(config.voting, config.profile).render();

        VotingImage.setLayout();
        VotingImage.addRISLinks();
        VotingComments.move();

        Lightbox.activate()
    }

    private static async config(): Promise<IOptions> {
        let config = await browser.storage.sync.get() as IOptions;
        if (typeof config.settings_schema === 'undefined') {
            await FlagmodPlusInstaller.run();
            config = await browser.storage.sync.get() as IOptions;
        }

        return config;
    }
}
