import {
  ACCEPT_HEADER,
  CONTENT_TYPE,
  CONTENT_TYPE_JSON,
  UA_VERSION_JSON,
} from '../../../../src/lib/Constants'
import { HttpMethod } from '../../../../src/lib/client/IRequest'
import { NamedUserTagRequest } from '../../../../src/lib/nameduser/NamedUserTagRequest'

let namedUserTagRequest: NamedUserTagRequest
let mockNamedUsers: string[]
let mockTagGroup: string
let mockTags: string[]

beforeEach(() => {
  namedUserTagRequest = new NamedUserTagRequest()
  mockNamedUsers = ['user1', 'user2', 'user3']
  mockTagGroup = 'fakeTagGroup'
  mockTags = ['tag1', 'tag2', 'tag3']
})

it('adds named users to audience', () => {
  namedUserTagRequest.addNamedUsers(...mockNamedUsers)

  expect(namedUserTagRequest.audience).toEqual({
    named_user_id: mockNamedUsers,
  })
})

it('adds add tags', () => {
  namedUserTagRequest.addTags(mockTagGroup, mockTags)

  expect(namedUserTagRequest.add).toEqual({
    [mockTagGroup]: mockTags,
  })
})

it('adds remove tags', () => {
  namedUserTagRequest.removeTags(mockTagGroup, mockTags)

  expect(namedUserTagRequest.remove).toEqual({
    [mockTagGroup]: mockTags,
  })
})

it('http method should be POST', () => {
  const receivedHttpMethod = namedUserTagRequest.getHttpMethod()

  expect(receivedHttpMethod).toEqual(HttpMethod.POST)
})

it('uri path is named user tags', () => {
  const receivedUriPath = namedUserTagRequest.getUriPath()

  expect(receivedUriPath).toEqual('/api/named_users/tags/')
})

it('should get correct request headers', () => {
  const receivedRequestHeaders = namedUserTagRequest.getRequestHeaders()

  const expectedRequestHeaders = {
    [CONTENT_TYPE]: CONTENT_TYPE_JSON,
    [ACCEPT_HEADER]: UA_VERSION_JSON,
  }

  expect(receivedRequestHeaders).toEqual(expectedRequestHeaders)
})

describe('getRequestBody', () => {
  it('gets request body (+named users, +add tags, -remove tags)', () => {
    namedUserTagRequest.addNamedUsers(...mockNamedUsers)
    namedUserTagRequest.addTags(mockTagGroup, mockTags)

    const receivedRequestBody = namedUserTagRequest.getRequestBody()

    const expectedRequestBody = JSON.stringify({
      audience: { named_user_id: mockNamedUsers },
      add: { [mockTagGroup]: mockTags },
    })

    expect(receivedRequestBody).toEqual(expectedRequestBody)
  })

  it('gets request body (+named users, -add tags, +remove tags)', () => {
    namedUserTagRequest.addNamedUsers(...mockNamedUsers)
    namedUserTagRequest.removeTags(mockTagGroup, mockTags)

    const receivedRequestBody = namedUserTagRequest.getRequestBody()

    const expectedRequestBody = JSON.stringify({
      audience: { named_user_id: mockNamedUsers },
      remove: { [mockTagGroup]: mockTags },
    })

    expect(receivedRequestBody).toEqual(expectedRequestBody)
  })

  it('gets request body (+named users, +add tags, +remove tags)', () => {
    namedUserTagRequest.addNamedUsers(...mockNamedUsers)
    namedUserTagRequest.addTags(mockTagGroup, mockTags)
    namedUserTagRequest.removeTags(mockTagGroup, mockTags)

    const receivedRequestBody = namedUserTagRequest.getRequestBody()

    const expectedRequestBody = JSON.stringify({
      audience: { named_user_id: mockNamedUsers },
      add: { [mockTagGroup]: mockTags },
      remove: { [mockTagGroup]: mockTags },
    })

    expect(receivedRequestBody).toEqual(expectedRequestBody)
  })
})
