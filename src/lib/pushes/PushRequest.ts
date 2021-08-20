import { IHeaders } from '../client/IHeaders'
import { HttpMethod, IRequest } from '../client/IRequest'
import {
  ACCEPT_HEADER,
  CONTENT_TYPE,
  CONTENT_TYPE_JSON,
  UA_VERSION_JSON,
} from '../Constants'

import { PushPayload } from './model/PushPayload'

export class PushRequest implements IRequest {
  private pushPayloads: PushPayload[] = []

  addPushPayload(payload: PushPayload) {
    this.pushPayloads.push(payload)
  }

  getHttpMethod(): HttpMethod {
    return HttpMethod.POST
  }

  getRequestBody(): string {
    return JSON.stringify(this.pushPayloads)
  }

  getRequestHeaders(): IHeaders {
    return {
      [ACCEPT_HEADER]: UA_VERSION_JSON,
      [CONTENT_TYPE]: CONTENT_TYPE_JSON,
    }
  }

  getUriPath(): string {
    return `/api/push/`
  }
}
