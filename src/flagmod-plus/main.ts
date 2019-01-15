import browser from 'webextension-polyfill';
import { defaults } from '../defaults';
import { VotingComments } from './voting-comments';
import { VotingForm } from './voting-form';
import { VotingImage } from './voting-image';

class FlagmodPlus {
    public static async load(): Promise<void> {
        const config = await browser.storage.sync.get(defaults);
        const formHtml = await fetch(browser.runtime.getURL('html/vote-form.html'))
            .then((response) => response.text());
        const form = new VotingForm();

        form.create(formHtml);
        form.addButtons(config.buttons.standard);
        form.addButtonsCustom(config.buttons.custom);
        form.addListeners();

        VotingImage.setLayout();
        VotingImage.addRISLinks();
        VotingComments.move();
    }
}

window.onload = () => {
    FlagmodPlus.load();
};
