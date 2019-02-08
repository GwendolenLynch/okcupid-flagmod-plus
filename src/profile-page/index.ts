import { browser } from 'webextension-polyfill-ts';

import { messageId } from '../constants';
import { IProfileOptions } from '../options/schema-interfaces';
import { IPostParamsMessageEvent } from './interfaces';
import { LastLogin } from './last-login/last-login';
import { MessageHandler } from './message-handler';
import { PageScriptInjector } from './page-script-injector';
import { PhotoReview } from './photo-review/photo-review';

PageScriptInjector.inject();

window.addEventListener('message', (event: IPostParamsMessageEvent) => {
    const response = MessageHandler.onPostParams(event);
    if (response === null) { return; }

    browser.storage.sync.get('profile')
        .then((config) => config.profile)
        .then((profile: IProfileOptions) => {
            if (profile.last_login) { LastLogin.add(response.profile); }
            if (profile.review_panel) { PhotoReview.run(response.profile, response.token); }
        });

    browser.runtime.sendMessage(messageId, { response: response });
});
