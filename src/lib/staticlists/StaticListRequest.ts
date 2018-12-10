import { IHeaders } from '../client/IHeaders';
import { HttpMethod, IRequest } from '../client/IRequest';
import { ACCEPT_HEADER, CONTENT_TYPE, CONTENT_TYPE_JSON, UA_VERSION_JSON } from '../Constants';

export class StaticListRequest implements IRequest {

    constructor(public name: string, public description: string) {
    }

    getHttpMethod(): HttpMethod {
        return HttpMethod.POST;
    }

    getRequestBody(): string {
        return JSON.stringify(this);
    }

    getRequestHeaders(): IHeaders {
        return {
            [CONTENT_TYPE]: CONTENT_TYPE_JSON,
            [ACCEPT_HEADER]: UA_VERSION_JSON
        }
    }

    getUriPath(): string {
        return '/api/lists';
    }
}