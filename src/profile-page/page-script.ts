declare var ACCESS_TOKEN;
declare var profileParams;

window.addEventListener('load', (event: Event) => {
    if (typeof profileParams === 'undefined') { return; }
    window.postMessage({action: 'POST_PARAMS', payload: {
            profile: profileParams,
            token: ACCESS_TOKEN,
        }}, '*');
}, false);
