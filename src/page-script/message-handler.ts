import { IProfile } from '../interfaces';
import { IPostParamsMessageEvent } from '../profile-page/interfaces';

export class MessageHandler {
    public static onPostParams(event: IPostParamsMessageEvent): null | { profile: IProfile, token: string } {
        if (event.data.action !== 'POST_PARAMS') { return null; }
        window.removeEventListener('message', MessageHandler.onPostParams, false);

        return {
            profile: event.data.payload.profile,
            token: event.data.payload.token,
        };
    }
}
