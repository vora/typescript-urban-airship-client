import { IHeaders } from '../client/IHeaders';
import { HttpMethod, IRequest } from '../client/IRequest';
import { ACCEPT_HEADER, UA_VERSION_JSON } from '../Constants';

export class StaticListLookupRequest implements IRequest {

    constructor(public name: string) {
    }

    getHttpMethod(): HttpMethod {
        return HttpMethod.GET;
    }

    getRequestBody(): string {
        return '';
    }

    getRequestHeaders(): IHeaders {
        return {
            [ACCEPT_HEADER]: UA_VERSION_JSON
        }
    }

    getUriPath(): string {
        return `/api/lists/${this.name}`;
    }
}