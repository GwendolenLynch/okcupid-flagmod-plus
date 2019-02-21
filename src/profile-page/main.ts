import browser from 'webextension-polyfill';
import { messageId } from '../constants';
import { defaults } from '../defaults';
import { IOptions } from '../interfaces';
import { LastLogin } from '../last-login/last-login';
import { PhotoReview } from '../photo-review/photo-review';
import { MessageHandler } from './message-handler';
import { PageScriptInjector } from './page-script-injector';

PageScriptInjector.inject();

window.addEventListener('message', (event) => {
    const response = MessageHandler.onPostParams(event);
    if (response === null) { return; }

    browser.storage.sync
        .get(defaults)
        .then((options: IOptions) => {
            if (options.profile.last_login) { LastLogin.add(response.profile); }
            if (options.profile.review_panel) { PhotoReview.run(response.profile, response.token); }

        });

    browser.runtime.sendMessage(messageId, { response: response });
});
