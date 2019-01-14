import { IProfile } from '../interfaces';
import { ButtonEvent } from './button-event';
import { buttonMeta } from './button-meta';

export class Buttons {
    public static add(
        parent: HTMLElement,
        input: HTMLInputElement,
        imageId: string,
        profile: IProfile,
        token: string,
    ): HTMLElement {
        const columns = document.createElement('div');
        columns.setAttribute('class', 'columns');

        parent.appendChild(columns);

        buttonMeta.forEach((meta) => {
            const column = document.createElement('div');
            const button = document.createElement('button');

            column.setAttribute('class', 'column');
            column.appendChild(button);
            columns.appendChild(column);

            button.setAttribute('class', `button is-fullwidth ${meta.class}`);
            button.setAttribute('data-objectId', imageId);
            button.setAttribute('data-ownerId', profile.userid);
            button.setAttribute('data-userId', profile.username);
            button.setAttribute('data-label', meta.label);

            button.innerText = meta.text;

            const buttonEventHandler = new ButtonEvent(button, input, profile, token);
            button.addEventListener('click', (event: MouseEvent) => {
                buttonEventHandler.onClick(event);
            });
        });

        return columns;
    }
}
