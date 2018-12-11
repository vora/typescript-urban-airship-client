import { APP_KEY_HEADER, AUTH_HEADER, BASE_URL } from '../Constants';

import { IHeaders } from './IHeaders';
import { IRequest } from './IRequest';
import { IRequestClient } from './IRequestClient';
import { RequestClient } from './RequestClient';
import { Response } from './Response';
import { UrbanAirshipClientBuilder } from './UrbanAirshipClientBuilder';

export class UrbanAirshipClient {
    private appKey: string;
    private appSecret?: string;
    private requestClient: IRequestClient;

    constructor(builder: UrbanAirshipClientBuilder) {
        this.appKey = builder.getAppKey();
        this.appSecret = builder.getAppSecret();
        this.requestClient = new RequestClient(BASE_URL);
    }

    execute<T>(clientRequest: IRequest): Promise<Response<T>> {
        return this.requestClient.execute(clientRequest, this.getHeaders());
    }

    private getHeaders(): IHeaders {
        const headers = {
            [APP_KEY_HEADER]: this.appKey,
            [AUTH_HEADER]: `Basic ${Buffer.from(`${this.appKey}:${this.appSecret}`).toString('base64')}`
        };
        return headers;
    }
}
