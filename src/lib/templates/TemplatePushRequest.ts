import { IHeaders } from '../client/IHeaders';
import { HttpMethod, IRequest } from '../client/IRequest';
import { ACCEPT_HEADER, CONTENT_TYPE, CONTENT_TYPE_JSON, UA_VERSION_JSON } from '../Constants';

import { TemplatePushPayload } from './model/TemplatePushPayload';

export class TemplatePushRequest implements IRequest {

    private pushPayloads: TemplatePushPayload[] = [];

    addPushPayload(payload: TemplatePushPayload){
        this.pushPayloads.push(payload);
    }

    getHttpMethod(): HttpMethod {
        return HttpMethod.POST;
    }

    getRequestBody(): string {
        return JSON.stringify(this.pushPayloads[0]);
    }

    getRequestHeaders(): IHeaders {
        return {
            [ACCEPT_HEADER]: UA_VERSION_JSON,
            [CONTENT_TYPE]: CONTENT_TYPE_JSON
        }
    }

    getUriPath(): string {
        return `/api/templates/push/`;
    }
}