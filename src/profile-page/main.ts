import { LastLogin } from '../last-login/last-login';
import { PhotoReview } from '../photo-review/photo-review';
import { MessageHandler } from './message-handler';
import { PageScriptInjector } from './page-script-injector';

PageScriptInjector.inject();

window.addEventListener('message', (event) => {
    const response = MessageHandler.onPostParams(event);
    if (response !== null) {
        LastLogin.add(response.profile);
        PhotoReview.run(response.profile, response.token);
    }
});
