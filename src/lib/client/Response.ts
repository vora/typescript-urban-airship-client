
export class Response<T> {
    body: T;
    headers: Map<string, string>
    status: number;

    constructor(body: T, headers: Map<string, string>, status: number) {
        this.body = body;
        this.headers = headers;
        this.status = status;
    }
}