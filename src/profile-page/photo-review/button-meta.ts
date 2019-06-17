// tslint:disable:object-literal-sort-keys

import { IButtonMeta, IProfileReport } from '../../interfaces';
import {
    LABEL_IMAGE_NTU,
    LABEL_IMAGE_NUDITY,
    LABEL_IMAGE_OFFENSIVE,
    LABEL_IMAGE_OTHER,
    LABEL_PROFILE_SEXUAL,
    TYPE_IMAGE,
    TYPE_PROFILE,
} from '../../report/types';

export const buttonMeta = [
    {
        id: 'ntu',
        text: 'NTU',
        class: 'is-dark',
        comment: '',
        label: LABEL_IMAGE_NTU,
        type: TYPE_IMAGE,
        report: false,
    },
    {
        id: 'nudity',
        text: 'Nudity',
        class: 'is-danger',
        comment: '',
        label: LABEL_IMAGE_NUDITY,
        type: TYPE_IMAGE,
        report: {
            type: TYPE_PROFILE,
            label: LABEL_PROFILE_SEXUAL,
        } as IProfileReport,
    },
    {
        id: 'offensive',
        text: 'Offensive',
        class: 'is-warning',
        comment: '',
        label: LABEL_IMAGE_OFFENSIVE,
        type: TYPE_IMAGE,
        report: false,
    },
    {
        id: 'other',
        text: 'Other',
        class: 'is-info',
        comment: '',
        label: LABEL_IMAGE_OTHER,
        type: TYPE_IMAGE,
        report: false,
    },
] as IButtonMeta[];
