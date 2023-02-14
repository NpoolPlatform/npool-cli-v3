import { BaseRequest, Notif } from '../../../base'

export interface GetNotifRequest extends BaseRequest{
  ID: string;
}

export interface GetNotifResponse {
  Info: Notif;
}

export interface UpdateNotifsRequest extends BaseRequest{
  IDs: string[];
  Notified: boolean;
}

export interface UpdateNotifsResponse {
  Infos: Notif[];
}

export interface GetNotifsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNotifsResponse {
  Infos: Notif[];
  /** @format int64 */
  Total: number;
}
