import { ExportPage } from '../export-page';

// tslint:disable:object-literal-sort-keys
const tabs = {
    'votes-standard': ['submit-save', 'submit-reset'],
    'votes-custom': ['submit-save', 'submit-reset'],
    'profile': ['submit-save', 'submit-reset'],
    'backup-export': [],
    'backup-import': ['submit-import'],
};

export class TabEvents {
    public static addListeners(): void {
        ['votes-standard', 'votes-custom', 'profile', 'backup-import'].forEach((item) => {
            const vote = document.getElementById(`tab-${item}`);

            if (vote) {
                vote.addEventListener('click', (event: MouseEvent) => {
                    TabEvents.onClick(`tab-content-${item}`);
                });
            }
        });

        const backupExportPage = document.getElementById('tab-backup-export');
        if (backupExportPage) {
            backupExportPage.addEventListener('click', (event: MouseEvent) => {
                TabEvents.onClick('tab-content-backup-export');
                TabEvents.onClickExport();
            });
        }
    }

    public static onClick(active: string): void {
        Object.entries(tabs)
            .forEach(([id, votes]) => {
                const tab = document.getElementById(`tab-${id}`);
                const content = document.getElementById(`tab-content-${id}`);

                if (!tab) { return; }
                if (!content) { return; }

                if (content.id === active) {
                    tab.classList.add('is-active');
                    content.classList.remove('is-hidden');
                } else {
                    tab.classList.remove('is-active');
                    content.classList.add('is-hidden');
                }
            });
        TabEvents.toggleButtons(active.replace('tab-content-', ''));
    }

    public static onClickExport(): void { ExportPage.render(); }

    private static toggleButtons(active: string): void {
        const actionBar = document.getElementById('action-buttons');
        if (!actionBar) { return; }

        const allowedButtons = tabs[active] as string[];
        [...actionBar.getElementsByTagName('button')].forEach((button: HTMLButtonElement) => {
            if (allowedButtons.includes(button.id)) {
                button.classList.remove('is-hidden');
            } else {
                button.classList.add('is-hidden');
            }
        });
    }
}
