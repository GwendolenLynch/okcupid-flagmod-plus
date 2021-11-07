import { IButtonMeta, IProfile } from '../../interfaces';
import { ButtonEventHandler } from './button-event-handler';
import { buttonMeta } from './button-meta';

export class Buttons {
    public static add(
        parent: HTMLElement,
        input: HTMLInputElement,
        imageId: string,
        profile: IProfile,
    ): HTMLElement {
        const columns = document.createElement('div');
        columns.setAttribute('class', 'columns');

        parent.appendChild(columns);

        buttonMeta.forEach((meta: IButtonMeta) => {
            const column = document.createElement('div');
            const button = document.createElement('button');

            column.setAttribute('class', 'column');
            column.appendChild(button);
            columns.appendChild(column);

            button.setAttribute('class', `button is-fullwidth ${meta.class}`);
            button.setAttribute('data-objectId', imageId);
            button.setAttribute('data-ownerId', profile.userid);
            button.setAttribute('data-userId', profile.username);
            button.setAttribute('data-label', String(meta.label));
            if (meta.report) {
                button.setAttribute('data-report-profile', JSON.stringify(meta.report));
            }

            button.innerText = meta.text;

            const buttonEventHandler = new ButtonEventHandler(button, input, profile);
            button.addEventListener('click', (event: MouseEvent) => buttonEventHandler.onClick(event));
        });

        return columns;
    }
}
