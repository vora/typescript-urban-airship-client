import { IHeaders } from '../client/IHeaders';
import { HttpMethod, IRequest } from '../client/IRequest';
import { ACCEPT_HEADER, CONTENT_TYPE, CONTENT_TYPE_TEXT_CSV, UA_VERSION_JSON } from '../Constants';

export class StaticListUploadRequest implements IRequest {

    constructor(public name: string, public listContent: Map<string, string>) {
    }

    getHttpMethod(): HttpMethod {
        return HttpMethod.PUT;
    }

    getRequestBody(): string {
        return Array.from(this.listContent.entries()).reduce((old, [key, value] ) => {
            return old.concat(`${key},${value}\n`);
        }, '')
    }

    getRequestHeaders(): IHeaders {
        return {
            [CONTENT_TYPE]: CONTENT_TYPE_TEXT_CSV,
            [ACCEPT_HEADER]: UA_VERSION_JSON
        }
    }

    getUriPath(): string {
        return `/api/lists/${this.name}/csv`;
    }
}