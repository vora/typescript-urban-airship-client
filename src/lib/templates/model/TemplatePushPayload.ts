import { TemplateSelector } from './TemplateSelector'

export type DeviceType =
  | 'ios'
  | 'android'
  | 'amazon'
  | 'web'
  | 'wns'
  | 'email'
  | 'sms'

export class TemplatePushPayload {
  audience: any
  // tslint:disable-next-line:variable-name
  merge_data: TemplateSelector
  // tslint:disable-next-line:variable-name
  device_types: DeviceType[]
}
