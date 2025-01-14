import { IHeaders } from './IHeaders'

export interface IRequest {
  getHttpMethod(): HttpMethod

  getRequestBody(): string

  getRequestHeaders(): IHeaders

  getUriPath(): string
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
