import { NamedUserTagRequest } from '../../../../src/lib/nameduser/NamedUserTagRequest'

const mockNamedUsers = ['user1', 'user2', 'user3']
const mockTagGroup = 'fakeTagGroup'
const mockTags = ['tag1', 'tag2', 'tag3']

it('adds named users to audience', () => {
  const namedUserTagRequest = new NamedUserTagRequest()

  namedUserTagRequest.addNamedUsers(...mockNamedUsers)

  expect(namedUserTagRequest.audience).toEqual({
    named_user_id: mockNamedUsers,
  })
})

it('adds add tags', () => {
  const namedUserTagRequest = new NamedUserTagRequest()

  namedUserTagRequest.addTags(mockTagGroup, mockTags)

  expect(namedUserTagRequest.add).toEqual({
    [mockTagGroup]: mockTags,
  })
})

it('adds remove tags', () => {
  const namedUserTagRequest = new NamedUserTagRequest()

  namedUserTagRequest.removeTags(mockTagGroup, mockTags)

  expect(namedUserTagRequest.remove).toEqual({
    [mockTagGroup]: mockTags,
  })
})

describe('getRequestBody', () => {
  it('gets request body (+named users, +add tags, -remove tags)', () => {
    const namedUserTagRequest = new NamedUserTagRequest()

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
    const namedUserTagRequest = new NamedUserTagRequest()

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
    const namedUserTagRequest = new NamedUserTagRequest()

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
