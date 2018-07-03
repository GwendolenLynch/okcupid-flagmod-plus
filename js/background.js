'use strict';

class FlagmodPlusUpdate {
    constructor() {
        this.storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
    }

    /**
     * Update options schema.
     */
    updateSchema() {
        this.storage.sync.get(null, (items) => {
            // Fix incorrect schema before v0.9.5
            if (typeof items.buttons === 'undefined' && items.standard !== 'undefined') {
                this.storage.sync.remove(['standard', 'custom']);
                this.storage.sync.set({
                    settings_schema: 1,
                    buttons: items,
                });
            }
        });
    }

    /**
     * Change 'options.buttons.standard' values to an object.
     */
    updateButtonsStandard() {
        this.storage.sync.get(null, (items) => {
            const standard = items.standard || null;

            if (Array.isArray(standard)) {
                const arrayToObject = array => array.reduce((obj, item) => {
                    const key = item.key.replace('comment-', '');
                    obj[key] = item;
                    return obj;
                }, {});
                items.standard = arrayToObject(standard);
                this.storage.sync.set(items);
            }
        });
    }
}

const b = typeof browser === 'undefined' ? chrome : browser;

b.runtime.onInstalled.addListener((details) => {
    console.log('Flagmod Plus install events running');

    const update = new FlagmodPlusUpdate();

    update.updateSchema();
    update.updateButtonsStandard();
});
