import { App } from '../../../base'
import { BaseRequest } from '../../../base/notify'

export interface GetAppRequest extends BaseRequest {
  AppID: string;
}
export interface GetAppResponse {
  Info: App;
}
