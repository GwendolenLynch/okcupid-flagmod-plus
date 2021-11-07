import { IProfile } from '../interfaces';

let profileParams: { profile: IProfile } | undefined;

const loadEvent = (event: Event) => {
    if (typeof profileParams === 'undefined') { profileParams = undefined; }
    const message = {
        action: 'POST_PARAMS',
        payload: {
            profile: profileParams ? profileParams.profile : null,
        },
    };

    window.postMessage(message, '*');
};

window.addEventListener('load', loadEvent, false);
