import { IHeaders } from '../client/IHeaders'
import { HttpMethod, IRequest } from '../client/IRequest'
import { ACCEPT_HEADER, UA_VERSION_JSON } from '../Constants'

export class StaticListDeleteRequest implements IRequest {
  constructor(public id: string) {}

  getHttpMethod(): HttpMethod {
    return HttpMethod.DELETE
  }

  getRequestBody(): string {
    return ''
  }

  getRequestHeaders(): IHeaders {
    return {
      [ACCEPT_HEADER]: UA_VERSION_JSON,
    }
  }

  getUriPath(): string {
    return `/api/lists/${this.id}`
  }
}
