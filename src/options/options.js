import browser from 'webextension-polyfill';
import defaults from '../defaults';

require('../../scss/options.scss');

class FlagmodPlusOptions {
    static clearOptions() {
        browser.storage.sync.clear();
    }

    static dumpOptions() {
        browser.storage.sync
            .get(null)
            .then((options) => {
                console.log(options);
            });
    }

    static resetOptions() {
        if (window.confirm('Do you want to reset options to the defaults?')) {
            browser.storage.sync.set(defaults);
        }
    }

    static saveOptions(e) {
        e.preventDefault();

        const { buttons } = defaults;

        defaults.standard.forEach((standard, index) => {
            buttons.standard[index].comment = document.getElementById(standard.key).value;
        });

        defaults.custom.forEach((custom, index) => {
            buttons.custom[index].enable = document.getElementById(`custom-${index}`).checked;
            buttons.custom[index].vote = document.getElementById(`custom-${index}-vote`).value;
            buttons.custom[index].label = document.getElementById(`custom-${index}-label`).value;
            buttons.custom[index].comment = document.getElementById(`custom-${index}-comment`).value;
        });

        browser.storage.sync
            .set({ buttons })
            .then(() => {
                const status = document.getElementById('status');

                status.textContent = 'Options saved.';
                setTimeout(() => { status.textContent = ''; }, 1000);
            });
    }

    static restoreOptions() {
        browser.storage.sync
            .get(defaults)
            .then((items) => {
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