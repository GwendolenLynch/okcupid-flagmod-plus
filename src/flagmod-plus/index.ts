import { Injector } from '../page-script/injector';
import { MessageHandler } from '../page-script/message-handler';
import { IPostParamsMessageEvent } from '../profile-page/interfaces';
import { FlagmodPlus } from './flagmod-plus';

Injector.inject(true, false);

window.addEventListener('message', (event: IPostParamsMessageEvent) => {
    const response = MessageHandler.onPostParams(event);
    if (response === null) { return; }
    FlagmodPlus.load(response.profile);
});
