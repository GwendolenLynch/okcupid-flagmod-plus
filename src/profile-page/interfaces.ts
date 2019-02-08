import { IProfile } from '../interfaces';

export interface IPostParamsMessageEvent extends MessageEvent {
    data: {
        action: string,
        payload: {
            profile: IProfile,
            token: string,
        },
    };
}
