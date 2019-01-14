declare var ACCESS_TOKEN;
declare var profileParams;

window.addEventListener('load', (event: Event) => {
    window.postMessage({action: 'POST_PARAMS', payload: {
            profile: profileParams,
            token: ACCESS_TOKEN,
        }}, '*');
}, false);
