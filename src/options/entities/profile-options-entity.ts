import { IProfileOptions } from '../schema-interfaces';

export class ProfileOptions implements IProfileOptions {
    // tslint:disable:variable-name
    public review_panel: boolean;

    public constructor(review_panel: boolean = true) {
        this.review_panel = review_panel;
    }
}
