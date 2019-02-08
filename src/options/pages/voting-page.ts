import { browser } from 'webextension-polyfill-ts';

import { IOptions, IVotingOptions } from '../schema-interfaces';

import { VotingCustomFields } from './fields/voting-custom-fields';
import { VotingStandardFields } from './fields/voting-standard-fields';

export class VotingPage {
    public static async render(): Promise<void> {
            await browser.storage.sync.get('voting')
                // tslint:disable-next-line:no-unsafe-any
                .then((response) => response.voting)
                .then((voting: IVotingOptions) => {
                    VotingStandardFields.write(voting.standard);
                    VotingCustomFields.write(voting.custom);
                });
    }
}
