import '../../scss/options.scss';

import browser from 'webextension-polyfill';
import { defaults } from '../defaults';
import { IOptions } from '../interfaces';
import { TabEvents } from './tab-event';

class FlagmodPlusOptions {
    public static clearOptions(): void {
        browser.storage.sync.clear();
    }

    public static dumpOptions(): void {
        browser.storage.sync
            .get(null)
            .then((options) => {
                console.log(options);
            });
    }

    public static resetOptions(): void {
        if (window.confirm('Do you want to reset options to the defaults?')) {
            browser.storage.sync.set(defaults);
        }
    }

    public static saveOptions(event: Event): void {
        event.preventDefault();

        const buttons = defaults.buttons;
        const profile = defaults.profile;

        buttons.standard.forEach((standard, index) => {
            const key = document.getElementById(standard.key) as HTMLInputElement;
            buttons.standard[index].comment = key.value;
        });

        buttons.custom.forEach((custom, index) => {
            const enable = document.getElementById(`custom-${index}`) as HTMLInputElement;
            const vote = document.getElementById(`custom-${index}-vote`) as HTMLInputElement;
            const label = document.getElementById(`custom-${index}-label`) as HTMLInputElement;
            const comment = document.getElementById(`custom-${index}-comment`) as HTMLInputElement;

            buttons.custom[index].enable = enable.checked;
            buttons.custom[index].vote = Number(vote.value);
            buttons.custom[index].label = label.value;
            buttons.custom[index].comment = comment.value;
        });

        const lastLogin = document.getElementById('profile-enable-last-login') as HTMLInputElement;
        const review = document.getElementById('profile-enable-review') as HTMLInputElement;

        profile.last_login = Boolean(lastLogin.checked);
        profile.review_panel = Boolean(review.checked);

        browser.storage.sync
            .set({ buttons: buttons, profile: profile })
            .then(() => {
                const status = document.getElementById('status') as HTMLElement;

                status.textContent = 'Options saved.';
                setTimeout(() => { status.textContent = ''; }, 1000);
            });
    }

    public static restoreOptions(): void {
        browser.storage.sync
            .get(defaults)
            .then((items: IOptions) => {
                const buttons = items.buttons;
                const profile = items.profile;

                Object.entries(buttons.standard)
                    .forEach(([index, buttonConfig]) => {
                        const comment = document.getElementById(buttonConfig.key) as HTMLInputElement;
                        comment.value = buttonConfig.comment;
                });

                Object.entries(buttons.custom)
                    .forEach(([index, buttonConfig]) => {
                        const enable = document.getElementById(`custom-${index}`) as HTMLInputElement;
                        const vote = document.getElementById(`custom-${index}-vote`) as HTMLInputElement;
                        const label = document.getElementById(`custom-${index}-label`) as HTMLInputElement;
                        const comment = document.getElementById(`custom-${index}-comment`) as HTMLInputElement;

                        enable.checked = buttonConfig.enable;
                        vote.value = String(buttonConfig.vote);
                        label.value = buttonConfig.label;
                        comment.value = buttonConfig.comment;
                });

                const lastLogin = document.getElementById('profile-enable-last-login') as HTMLInputElement;
                const review = document.getElementById('profile-enable-review') as HTMLInputElement;

                lastLogin.checked = profile.last_login;
                review.checked = profile.review_panel;
            });
    }
}

document.addEventListener('DOMContentLoaded', (event: Event) => {
    FlagmodPlusOptions.restoreOptions();

    const save = document.getElementById('save') as HTMLButtonElement;
    const reset = document.getElementById('reset') as HTMLButtonElement;

    save.addEventListener('click', FlagmodPlusOptions.saveOptions);
    reset.addEventListener('click', FlagmodPlusOptions.resetOptions);
});

window.addEventListener('load', () => {
    TabEvents.addListeners();
});
