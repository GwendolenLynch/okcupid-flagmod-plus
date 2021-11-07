import { IImageReport, IProfileReport } from '../interfaces';
import { RequestFactory } from './request-factory';

export class Report {
    public static async submit(report: IProfileReport | IImageReport): Promise<void> {
        const request = RequestFactory.create(report);

        return await fetch(request)
            .then(async (response: Response) => response.json())
            .catch((response) => {
                console.error('FlagmodPlus Error', response);
            });
    }
}
