import { App, BaseRequest } from '../../../base'

export interface GetAppsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}
export interface GetAppsResponse {
  Infos: Array<App>;
}
