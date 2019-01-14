import browser from 'webextension-polyfill';

export class Tabs {
    public static addListener(): void {
        browser.browserAction.onClicked.addListener(() => {
            browser.runtime.openOptionsPage();
        });
    }
}
