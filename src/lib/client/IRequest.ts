import { IHeaders } from './IHeaders';

export interface IRequest {

    getHttpMethod(): HttpMethod;

    getRequestBody(): string | undefined;

    getRequestHeaders(): IHeaders;

    getUriPath(): string;
}

export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
}