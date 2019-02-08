import { browser } from 'webextension-polyfill-ts';

import { IOptions } from '../options/schema-interfaces';

import { VotingComments } from './voting-comments';
import { VotingForm } from './voting-form';
import { VotingImage } from './voting-image';

class FlagmodPlus {
    public static async load(): Promise<void> {
        const config = await browser.storage.sync.get() as IOptions;
        await new VotingForm(config.voting, config.profile).render();

        VotingImage.setLayout();
        VotingImage.addRISLinks();
        VotingComments.move();
    }
}

window.onload = () => {
    FlagmodPlus.load();
};
