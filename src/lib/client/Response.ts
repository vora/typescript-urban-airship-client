export class Response<T> {
  body: T
  headers?: Map<string, string>
  status: number

  constructor(status: number, body: T, headers?: Map<string, string>) {
    this.body = body
    this.headers = headers
    this.status = status
  }
}
