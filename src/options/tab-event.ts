const tabs = [
    'buttons-standard',
    'buttons-custom',
    'profile',
];

export class TabEvents {
    public static addListeners(): void {
        const buttonsStandard = document.getElementById('tab-buttons-standard');
        if (buttonsStandard) {
            buttonsStandard.addEventListener('click', (event: MouseEvent) => {
                TabEvents.onClick('tab-content-buttons-standard');
            });
        }

        const buttonsCustom = document.getElementById('tab-buttons-custom');
        if (buttonsCustom) {
            buttonsCustom.addEventListener('click', (event: MouseEvent) => {
                TabEvents.onClick('tab-content-buttons-custom');
            });
        }

        const profilePage = document.getElementById('tab-profile');
        if (profilePage) {
            profilePage.addEventListener('click', (event: MouseEvent) => {
                TabEvents.onClick('tab-content-profile');
            });
        }
    }

    public static onClick(active: string): void {
        tabs.forEach((id: string) => {
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
    }
}
