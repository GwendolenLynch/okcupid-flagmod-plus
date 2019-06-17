// tslint:disable:object-literal-sort-keys
import { IImageReport } from '../interfaces';
import { TYPE_IMAGE } from './types';

export class ImageReport implements IImageReport {
    private readonly _type: number = TYPE_IMAGE;
    private readonly _source: string = 'photo';
    private readonly _label: number;

    /** Photo's profile user ID */
    private readonly _userId: string;
    /** Photo (OkC object) ID */
    private readonly _id: string;
    /** Voter comment */
    private readonly _comment: string;

    public constructor(label: number, userId: string, id: string, comment: string) {
        this._label = label;
        this._userId = userId;
        this._id = id;
        this._comment = comment;
    }

    public get type(): number { return this._type; }
    public get source(): string { return this._source; }
    public get label(): number { return this._label; }
    public get userId(): string { return this._userId; }
    public get id(): string { return this._id; }
    public get comment(): string { return this._comment; }

    public toJSON(): object {
        return {
            type: this.type,
            source: this.source,
            label: this.label,
            userid: this.userId,
            id: this.id,
            comment: this.comment,
        };
    }
}
