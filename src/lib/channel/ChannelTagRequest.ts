import { IHeaders } from '../client/IHeaders'
import { HttpMethod, IRequest } from '../client/IRequest'
import {
  ACCEPT_HEADER,
  CONTENT_TYPE,
  CONTENT_TYPE_JSON,
  UA_VERSION_JSON,
} from '../Constants'

const IOS_CHANNEL_KEY = 'ios_channel'
const ANDROID_CHANNEL_KEY = 'android_channel'

export class ChannelTagRequest implements IRequest {
  audience: { [key: string]: string[] } = {}
  add: { [key: string]: string[] } = {}

  addTags(tagGroup: string, tags: string[]) {
    this.addChannelToKey(this.add, tagGroup, ...tags)
  }

  addIosChannel(...channels: string[]) {
    this.addChannelToKey(this.audience, IOS_CHANNEL_KEY, ...channels)
  }

  addAndroidChannel(...channels: string[]) {
    this.addChannelToKey(this.audience, ANDROID_CHANNEL_KEY, ...channels)
  }

  getHttpMethod(): HttpMethod {
    return HttpMethod.POST
  }

  getRequestBody(): string {
    return JSON.stringify(this)
  }

  getRequestHeaders(): IHeaders {
    return {
      [CONTENT_TYPE]: CONTENT_TYPE_JSON,
      [ACCEPT_HEADER]: UA_VERSION_JSON,
    }
  }

  getUriPath(): string {
    return '/api/channels/tags/'
  }

  private addChannelToKey(
    map: { [key: string]: string[] },
    key: string,
    ...channels: string[]
  ) {
    if (!map[key]) {
      map[key] = []
    }
    map[key] = map[key].concat(channels)
  }
}
