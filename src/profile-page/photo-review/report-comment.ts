import { IProfile } from '../../interfaces';

export class ReportComment {
    public static add(column: HTMLElement, imageId: string, profile: IProfile): HTMLInputElement {
        const field = document.createElement('div');
        field.setAttribute('class', 'field');
        column.appendChild(field);

        const control = document.createElement('div');
        control.setAttribute('class', 'control');
        field.appendChild(control);

        const input = document.createElement('input');
        control.appendChild(input);

        input.setAttribute('class', 'input');
        input.type = 'text';
        input.placeholder = 'Optional comment to send with your report';

        return input;
    }
}
