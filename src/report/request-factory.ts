// tslint:disable:object-literal-sort-keys
import { hosts } from '../hosts';
import { IImageReport, IProfileReport } from '../interfaces';

export class RequestFactory {
    public static create(report: IProfileReport | IImageReport): Request {
        return new Request(
            `${hosts.okCupid.profileApi}/${report.userId}/report`,
            {
                body: JSON.stringify(report),
                credentials: 'include',
                headers: new Headers({
                    'Content-Type': 'application/json; charset=UTF-8',
                    'X-OkCupid-Platform': 'DESKTOP',
                    'X-Requested-With': 'XMLHttpRequest',
                }),
                method: 'POST',
                redirect: 'follow',
            },
        );
    }
}
