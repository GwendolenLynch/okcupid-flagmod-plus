// tslint:disable:object-literal-sort-keys

import '../../../../scss/options.scss';

import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import { browser } from 'webextension-polyfill-ts';

import { schema, schemaVersion } from '../../schema';
import { IOptions } from '../../schema-interfaces';

// import { ProfileFields } from '../fields/profile-fields';
import { VotingCustomFields } from '../fields/voting-custom-fields';
import { VotingStandardFields } from '../fields/voting-standard-fields';

const question = (title: string, text: string, confirmButtonText: string): SweetAlertOptions => ({
    icon: 'question',
    title: title,
    text: text,
    showCancelButton: true,
    focusCancel: true,
    confirmButtonText: confirmButtonText,
    customClass: {
        confirmButton: 'button is-success is-large',
        cancelButton: 'button is-danger is-large'
    },
    buttonsStyling: false,
});

const jsonError = (error: string): SweetAlertOptions => ({
    icon: 'error',
    title: 'JSON not valid!',
    text: `The provided data was not valid JSON: ${error}`,
    customClass: {
        confirmButton: 'button is-info is-large',
    },
    buttonsStyling: false,
});

export class ButtonEvents {
    public static addListeners(): void {
        const submitSave = document.getElementById('submit-save') as HTMLButtonElement;
        const submitReset = document.getElementById('submit-reset') as HTMLButtonElement;
        const submitImport = document.getElementById('submit-import') as HTMLButtonElement;

        submitSave.addEventListener('click', ButtonEvents.save);
        submitReset.addEventListener('click', ButtonEvents.reset);
        submitImport.addEventListener('click', ButtonEvents.import);
    }

    public static reset(): void {
        Swal.fire(question(
            'Do you want to reset all options?',
            'Proceeding will reset stored options to their defaults and can not be undone.',
            'Reset Settings',
        ))
            .then((result: SweetAlertResult) => {
                if (result.value) { browser.storage.sync.set(schema()); }
            });
    }

    public static save(event: Event): void {
        event.preventDefault();

        const pending = {
            voting: {
                standard: VotingStandardFields.read().votes,
                custom: VotingCustomFields.read().votes,
            },
            // profile: ProfileFields.read(),
        };

        browser.storage.sync.set(pending)
            .then(() => {
                const status = document.getElementById('status') as HTMLElement;

                status.textContent = 'Options saved.';
                setTimeout(() => { status.textContent = ''; }, 1000);
            });
    }

    public static async import(): Promise<SweetAlertResult> {
        const textarea = document.getElementById('content-backup-import') as HTMLInputElement;
        if (!textarea) { throw Error('Import textarea ID was not found'); }

        if (textarea.value.length < 2) {
            return Swal.fire(jsonError('Empty data'));
        }

        return Swal.fire(question(
            'Do you want to import & save this JSON?',
            'Proceeding overwrite stored settings with the contents.',
            'Import',
        ))
            .then((result) => {
                if (!result.value) { return result; }

                const parsed = JSON.parse(textarea.value) as IOptions;
                if (parsed.settings_schema !== schemaVersion) {
                    return Swal.fire(jsonError('Schema version mismatch!'));
                }
                browser.storage.sync.set(parsed);

                return result;
            })
            .then((result) => {
                if (!result.value) { return result; }

                return Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    customClass: {
                        confirmButton: 'button is-success is-large',
                    },
                    buttonsStyling: false,
                });
            })
            .then((result) => {
                window.location.reload();

                return result;
            })
            .catch(async (error: string) => Swal.fire(jsonError(error)));
    }
}
