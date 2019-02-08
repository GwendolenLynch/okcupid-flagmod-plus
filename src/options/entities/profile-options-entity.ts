import { IProfileOptions } from '../schema-interfaces';

export class ProfileOptions implements IProfileOptions {
    // tslint:disable:variable-name
    public last_login: boolean;
    public review_panel: boolean;

    public constructor(last_login: boolean = true, review_panel: boolean = true) {
        this.last_login = last_login;
        this.review_panel = review_panel;
    }
}
