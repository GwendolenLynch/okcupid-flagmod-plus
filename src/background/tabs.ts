import { browser } from 'webextension-polyfill-ts';

export class Tabs {
    public static addListener(): void {
        browser.browserAction.onClicked.addListener(() => {
            browser.runtime.openOptionsPage();
        });
    }
}
