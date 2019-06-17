import { IProfile } from '../interfaces';

declare var ACCESS_TOKEN: string;
declare var profileParams: { profile: IProfile } | undefined;

const loadEvent = (event: Event) => {
    if (typeof profileParams === 'undefined') { profileParams = undefined; }
    const message = {
        action: 'POST_PARAMS',
        payload: {
            profile: profileParams ? profileParams.profile : null,
            token: ACCESS_TOKEN,
        },
    };

    window.postMessage(message, '*');
};

window.addEventListener('load', loadEvent, false);
