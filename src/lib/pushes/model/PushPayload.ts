import { DeviceType } from '../../templates/model/TemplatePushPayload'

export class PushPayload {
  audience: any
  campaigns?: any
  feed_references?: any
  localizations?: ILocalization[]
  message?: any
  notification?: INotification
  snippet_references?: ISnippetReferences
  options?: IOptions
  device_types: DeviceType[]
}

interface IOptions {
  bypass_frequency_limits?: boolean
  expiry?: string | number
  no_throttle?: boolean
  personalization?: boolean
  redact_payload?: boolean
}

interface ISnippetReferences {
  snippets: { name: string }[]
}

interface INotification {
  actions?: IActions
  alert?: string
  amazon?: any
  android?: any
  email?: any
  ios?: any
  mms?: any
  sms?: any
  web?: any
  wns?: any
}

interface IActions {
  add_tag?: string[]
  app_defined?: { string: string }
  open?: IOpen
  remove_tag?: string[]
  share?: string
}

interface IOpen {
  type: string
  content: string
  fallback_url?: string
}

interface ILocalization {
  country?: string
  in_app?: any
  language: string
  message?: any
  notification?: INotification
}
