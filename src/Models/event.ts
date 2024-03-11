export class Event {
    constructor() {
        this._uid = '';
        this._summary = '';
        this._start = '';
        this._end = '';
        this._salles = '';
    }


    private _uid: string;
    private _summary: string;
    private _start: string;
    private _end: string;
    private _salles: string;

    public get uid(): string {
        return this._uid;
    }
    public set uid(value: string) {
        this._uid = value;
    }
    public get summary(): string {
        return this._summary;
    }
    public set summary(value: string) {
        this._summary = value;
    }

    public get start(): string {
        return this._start;
    }
    public set start(value: string) {
        this._start = value;
    }

    public get end(): string {
        return this._end;
    }
    public set end(value: string) {
        this._end = value;
    }

    public get salles(): string {
        return this._salles;
    }
    public set salles(value: string) {
        this._salles = value;
    }
}