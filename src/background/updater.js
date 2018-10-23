import browser from 'webextension-polyfill';

class FlagmodPlusUpdater {
    static addListeners() {
        browser.runtime.onInstalled.addListener((details) => {
            FlagmodPlusUpdater.updateSchema();
            FlagmodPlusUpdater.updateButtonsStandard();
        });
    }

    /**
     * Update options schema.
     *
     * @returns {void}
     */
    static async updateSchema() {
        const config = await browser.storage.sync.get(null);
        // Fix incorrect schema before v0.9.5
        if (typeof config.buttons === 'undefined' && config.standard !== 'undefined') {
            browser.storage.sync.remove(['standard', 'custom']);
            browser.storage.sync.set({
                settings_schema: 1,
                buttons: config,
            });
        }
    }

    /**
     * Change 'options.buttons.standard' values to an object.
     *
     * @returns {void}
     */
    static async updateButtonsStandard() {
        const config = await browser.storage.sync.get(null);
        const standard = config.standard || null;

        if (Array.isArray(standard)) {
            const object = {};
            const arrayToObject = array => array.reduce((obj, item) => {
                const key = item.key.replace('comment-', '');
                object[key] = item;
                return object;
            }, object);
            config.standard = arrayToObject(standard);
            browser.storage.sync.set(config);
        }
    }
}

export default FlagmodPlusUpdater;
