import { IHeaders } from './IHeaders'
import { IRequest } from './IRequest'
import { IRequestClient } from './IRequestClient'
import { Response } from './Response'

export class RequestClient implements IRequestClient {
  private baseUrl: string

  constructor(base: string) {
    this.baseUrl = base
  }

  async execute<T>(clientRequest: IRequest, headers: IHeaders): Promise<Response<T>> {
    //const req = new Request(`${this.baseUrl}${clientRequest.getUriPath()}`, {
    //  method: clientRequest.getHttpMethod(),
    //  mode: 'no-cors',
    //  body: JSON.stringify({"audience":{"named_user_id":["IFNJNCJN3WQ"]},"add":{"reservations":["67165d94bc35f31ee44fef00_test"]}}),
    //  headers: { ...headers, ...clientRequest.getRequestHeaders(),  'content-type': 'application/json' }
    //})
    //const chunks = []
    //for await (let chunk of req.body!) {
    //  chunks.push(chunk)
    //}
    //console.debug(`body: ${Buffer.concat(chunks).toString()}`)
    //console.debug(req.headers)
    //const r = await fetch(req)

    const r = await fetch(`${this.baseUrl}${clientRequest.getUriPath()}`, {
      method: clientRequest.getHttpMethod(),
      body: clientRequest.getRequestBody(),
      headers: { ...headers, ...clientRequest.getRequestHeaders() },
    })

    if (!r.ok) {
      /* eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors */
      return Promise.reject(new Response(r.status, tryParseBody(r.body)))
    } else {
      return new Response(r.status, tryParseBody(r.body))
    }
  }

  getUrl(req?: IRequest) {
    return req ? this.baseUrl + req.getUriPath() : this.baseUrl
  }
}

function tryParseBody(body: any) {
  try {
    return body ? JSON.parse(body) : undefined
  } catch (e) {
    return undefined
  }
}
