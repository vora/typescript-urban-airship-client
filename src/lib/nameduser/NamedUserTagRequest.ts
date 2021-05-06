import { IHeaders } from '../client/IHeaders'
import { HttpMethod, IRequest } from '../client/IRequest'
import {
  ACCEPT_HEADER,
  CONTENT_TYPE,
  CONTENT_TYPE_JSON,
  UA_VERSION_JSON,
} from '../Constants'

const NAMED_USER_ID_KEY = 'named_user_id'

interface IPayload {
  audience: Record<typeof NAMED_USER_ID_KEY, string[]>
  add?: Record<string, string[]>
  remove?: Record<string, string[]>
}

export class NamedUserTagRequest implements IRequest {
  audience: Record<typeof NAMED_USER_ID_KEY, string[]> = {
    [NAMED_USER_ID_KEY]: [],
  }
  add: Record<string, string[]> = {}
  remove: Record<string, string[]> = {}

  addTags(tagGroup: string, tags: string[]) {
    this.addValuesToKey(this.add, tagGroup, ...tags)
  }

  removeTags(tagGroup: string, tags: string[]) {
    this.addValuesToKey(this.remove, tagGroup, ...tags)
  }

  addNamedUsers(...namedUsers: string[]) {
    this.addValuesToKey(this.audience, NAMED_USER_ID_KEY, ...namedUsers)
  }

  getHttpMethod(): HttpMethod {
    return HttpMethod.POST
  }

  getRequestBody(): string {
    const payload: IPayload = {
      audience: this.audience,
    }

    if (Object.keys(this.add).length) {
      payload['add'] = this.add
    }

    if (Object.keys(this.remove).length) {
      payload['remove'] = this.remove
    }

    return JSON.stringify(payload)
  }

  getRequestHeaders(): IHeaders {
    return {
      [CONTENT_TYPE]: CONTENT_TYPE_JSON,
      [ACCEPT_HEADER]: UA_VERSION_JSON,
    }
  }

  getUriPath(): string {
    return '/api/named_users/tags/'
  }

  private addValuesToKey(
    map: { [key: string]: string[] },
    key: string,
    ...values: string[]
  ) {
    if (!map[key]) {
      map[key] = []
    }
    map[key] = map[key].concat(values)
  }
}
