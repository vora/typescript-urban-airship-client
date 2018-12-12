import { IHeaders } from './IHeaders'
import { IRequest } from './IRequest'
import { Response } from './Response'

export interface IRequestClient {
  execute<T>(request: IRequest, headers: IHeaders): Promise<Response<T>>
}
