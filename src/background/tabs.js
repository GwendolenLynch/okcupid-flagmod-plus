import browser from 'webextension-polyfill';

class Tabs {
    static addListener() {
        browser.browserAction.onClicked.addListener(() => {
            browser.runtime.openOptionsPage();
        });
    }
}

export default Tabs;
