import request from 'request'

import { PushRequest } from '../../../../src/lib/pushes/PushRequest'
import { RequestClient } from '../../../../src/lib/client/RequestClient'
import { Response } from '../../../../src/lib/client/Response'

let client: RequestClient
let postSpy: jest.SpyInstance

beforeEach(() => {
  client = new RequestClient('')
  postSpy = jest.spyOn(request, 'post')
})

describe('when receiving success response', () => {
  it('parses JSON body without error', async () => {
    const req = new PushRequest()

    const body = { foo: 'bar' }
    mockResponseOnce(200, JSON.stringify(body))

    await expect(client.execute(req, {})).resolves.toEqual(
      new Response(200, body),
    )
  })

  it('strips non-JSON body without error', async () => {
    const req = new PushRequest()

    const body = '<html>foo</html>'
    mockResponseOnce(200, body)

    await expect(client.execute(req, {})).resolves.toEqual(
      new Response(200, undefined),
    )
  })
})

describe('when receiving error response', () => {
  it('parses JSON body without error', async () => {
    const req = new PushRequest()

    const body = { foo: 'bar' }
    mockResponseOnce(400, JSON.stringify(body))

    await expect(client.execute(req, {})).rejects.toEqual(
      new Response(400, body),
    )
  })

  it('strips non-JSON body without error', async () => {
    const req = new PushRequest()

    const body = '<html>foo</html>'
    mockResponseOnce(400, body)

    await expect(client.execute(req, {})).rejects.toEqual(
      new Response(400, undefined),
    )
  })

  it('retrieves statusCode without error', async () => {
    const req = new PushRequest()

    const body = { foo: 'bar' }
    mockResponseOnce(400, JSON.stringify(body))

    await expect(client.execute(req, {})).rejects.toMatchObject(
      new Response(400, body),
    )
  })
})

describe('when erroring before making request', () => {
  it('does not error retrieving statusCode', async () => {
    const req = new PushRequest()

    // This will error if not mocked as the baseUrl provided to the client in
    // `beforeEach` is an empty string.
    await expect(client.execute(req, {})).rejects.toThrow(
      'Invalid URI "/api/push/"',
    )
  })
})

const mockResponseOnce = (statusCode: number, body: string) => {
  postSpy.mockImplementationOnce((_, callback) => {
    callback!(null, { statusCode } as request.Response, body)
    return {} as request.Request
  })
}
