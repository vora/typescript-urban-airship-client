import * as request from 'request'

import { IHeaders } from './IHeaders'
import { HttpMethod, IRequest } from './IRequest'
import { IRequestClient } from './IRequestClient'
import { Response } from './Response'

export class RequestClient implements IRequestClient {
  private baseUrl: string

  constructor(base: string) {
    this.baseUrl = base
  }

  async execute<T>(
    clientRequest: IRequest,
    headers: IHeaders,
  ): Promise<Response<T>> {
    return new Promise((resolve, reject) => {
      let reqHeaders = headers
      const clientHeaders = clientRequest.getRequestHeaders()
      if (clientHeaders) {
        reqHeaders = { ...reqHeaders, ...clientHeaders }
      }
      const options = {
        url: this.baseUrl + clientRequest.getUriPath(),
        body: clientRequest.getRequestBody(),
        headers: reqHeaders,
      }

      const callback = (err: any, res: request.Response, body: any) => {
        // tslint:disable-next-line:no-magic-numbers
        const hasError = res.statusCode < 200 || res.statusCode >= 300
        if (err || hasError) {
          reject(err || new Response(res.statusCode, JSON.parse(body)))
        } else {
          resolve(
            new Response(res.statusCode, body ? JSON.parse(body) : undefined),
          )
        }
      }

      switch (clientRequest.getHttpMethod()) {
        case HttpMethod.GET:
          request.get(options, callback)
          break
        case HttpMethod.POST:
          request.post(options, callback)
          break
        case HttpMethod.DELETE:
          request.delete(options, callback)
          break
        case HttpMethod.PUT:
          request.put(options, callback)
          break
        default:
          throw new Error('Unssupported HTTP method')
      }
    })
  }

  getUrl(req?: IRequest) {
    return req ? this.baseUrl + req.getUriPath() : this.baseUrl
  }
}
