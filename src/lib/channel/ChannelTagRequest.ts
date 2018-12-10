import { IHeaders } from '../client/IHeaders';
import { HttpMethod, IRequest } from '../client/IRequest';
import { ACCEPT_HEADER, CONTENT_TYPE, CONTENT_TYPE_JSON, UA_VERSION_JSON } from '../Constants';

export class ChannelTagRequest implements IRequest {
    audience: { [key: string]: string[] };
    add: string[];
    remove: string[];
    set: string[];

    private IOS_CHANNEL_KEY = "ios_channel";
    private ANDROID_CHANNEL_KEY = "android_channel"

    addTags(tags: string[]){
        this.add = tags;
    }

    removeTags(tags: string[]){
        this.remove = tags;
    }

    setTags(tags: string[]){
        this.set = tags;
    }

    addIosChannel(...channels: string[]){
        this.addChannelToKey(this.IOS_CHANNEL_KEY, ...channels);
    }

    addAndroidChannel(...channels: string[]){
        this.addChannelToKey(this.ANDROID_CHANNEL_KEY, ...channels);
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
        return '/api/channels/tags/';
    }

    private addChannelToKey(key: string, ...channels: string[]){
        if(!this.audience[key]) {
            this.audience[key] = []
        }
        this.audience[key].concat(channels)
    }
}