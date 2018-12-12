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

  execute<T>(clientRequest: IRequest, headers: IHeaders): Promise<Response<T>> {
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
          reject(err || { statusCode: res.statusCode, error: body })
        } else {
          resolve(
            new Response(JSON.parse(body), undefined as any, res.statusCode),
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
}
