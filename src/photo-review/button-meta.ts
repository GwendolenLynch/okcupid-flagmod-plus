// tslint:disable:object-literal-sort-keys

export interface IButtonMeta {
    id: string;
    text: string;
    class: string;
    comment: string;
    label: string;
    type: number;

}

export const buttonMeta = [
    {
        id: 'ntu',
        text: 'NTU',
        class: 'is-dark',
        comment: '',
        label: '9',
        type: 0,
    },
    {
        id: 'nudity',
        text: 'Nudity',
        class: 'is-danger',
        comment: '',
        label: '8',
        type: 0,
    },
    {
        id: 'offensive',
        text: 'Offensive',
        class: 'is-warning',
        comment: '',
        label: '7',
        type: 0,
    },
    {
        id: 'other',
        text: 'Other',
        class: 'is-info',
        comment: '',
        label: '10',
        type: 0,
    },
];
