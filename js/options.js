'use strict';

class FlagmodPlusOptions {
    static clearOptions() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;

        storage.sync.clear();
    }

    static dumpOptions() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;

        storage.sync.get(null, (options) => {
            console.log(options);
        });
    }

    static resetOptions() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
        const options = FlagmodPlusDefaults.get();

        storage.sync.set(options);
    }

    static saveOptions() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
        const options = FlagmodPlusDefaults.get();
        const buttons = options.buttons;

        buttons.standard.forEach((standard, index) => {
            buttons.standard[index].comment = document.getElementById(standard.key).value;
        });

        buttons.custom.forEach((custom, index) => {
            buttons.custom[index].enable = document.getElementById(`custom-${index}`).checked;
            buttons.custom[index].vote = document.getElementById(`custom-${index}-vote`).value;
            buttons.custom[index].label = document.getElementById(`custom-${index}-label`).value;
            buttons.custom[index].comment = document.getElementById(`custom-${index}-comment`).value;
        });

        storage.sync.set({'buttons': buttons}, () => {
            const status = document.getElementById('status');

            status.textContent = 'Options saved.';
            setTimeout(() => { status.textContent = ''; }, 1000);
        });
    }

    static restoreOptions() {
        const storage = (typeof browser !== 'undefined') ? browser.storage : chrome.storage;
        const options = FlagmodPlusDefaults.get();

        storage.sync.get(options, (items) => {
            const buttons = items.buttons || {};

            Object.entries(buttons.standard).forEach(([key, standard]) => {
                document.getElementById(standard.key).value = standard.comment;
            });

            Object.entries(buttons.custom).forEach(([key, custom]) => {
                document.getElementById(`custom-${key}`).checked = custom.enable;
                document.getElementById(`custom-${key}-vote`).value = custom.vote;
                document.getElementById(`custom-${key}-label`).value = custom.label;
                document.getElementById(`custom-${key}-comment`).value = custom.comment;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', FlagmodPlusOptions.restoreOptions);
document.getElementById('save').addEventListener('click', FlagmodPlusOptions.saveOptions);
document.getElementById('reset').addEventListener('click', FlagmodPlusOptions.resetOptions);
