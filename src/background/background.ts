import { Tabs } from './tabs';
import { FlagmodPlusUpdater } from './updater';

(() => {
    FlagmodPlusUpdater.addListeners();
    Tabs.addListener();
})();
