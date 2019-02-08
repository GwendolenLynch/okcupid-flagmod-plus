import '../../scss/options.scss';

import { browser } from 'webextension-polyfill-ts';

import { ButtonEvents } from './pages/events/button-events';
import { TabEvents } from './pages/events/tab-event';

import { ProfilePage } from './pages/profile-page';
import { VotingPage } from './pages/voting-page';

document.addEventListener('DOMContentLoaded', async (event: Event) => {
    await VotingPage.render();
    await ProfilePage.render();

    ButtonEvents.addListeners();
    TabEvents.addListeners();

    const version = document.getElementById('version');
    if (!version) { return; }
    version.innerText = browser.runtime.getManifest().version;
});
