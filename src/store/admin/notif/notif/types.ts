import { BaseRequest, Notif } from '../../../base'

export interface GetAppNotifsRequest extends BaseRequest {
  AppID?: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppNotifsResponse {
  Infos: Notif[];
  /** @format int64 */
  Total: number;
}
