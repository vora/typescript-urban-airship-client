import assert from 'power-assert'

import { UrbanAirshipClient } from './UrbanAirshipClient'

export class UrbanAirshipClientBuilder {
  private appKey: string
  private appSecret: string
  private bearerToken: string

  getAppKey(): string {
    return this.appKey
  }

  setAppKey(key: string): UrbanAirshipClientBuilder {
    this.appKey = key
    return this
  }

  getAppSecret(): string {
    return this.appSecret
  }

  setAppSecret(secret: string): UrbanAirshipClientBuilder {
    this.appSecret = secret
    return this
  }

  getBearerToken(): string {
    return this.bearerToken
  }

  setBearerToken(token: string): UrbanAirshipClientBuilder {
    this.bearerToken = token
    return this
  }

  build(): UrbanAirshipClient {
    assert(this.appKey, 'App key must be defined')
    assert(
      this.appSecret || this.bearerToken,
      'App secret or bearer token must be defined',
    )
    return new UrbanAirshipClient(this)
  }
}
