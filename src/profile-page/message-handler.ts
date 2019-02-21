import { IProfile } from '../interfaces';

export class MessageHandler {
    public static onPostParams(event: MessageEvent): null | { profile: IProfile, token: string } {
        if (event.data.action !== 'POST_PARAMS') { return null; }
        window.removeEventListener('message', MessageHandler.onPostParams, false);

        return {
            profile: event.data.payload.profile.profile,
            token: event.data.payload.token,
        };
    }
}
