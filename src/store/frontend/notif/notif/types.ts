import { BaseRequest, Notif } from '../../../base'

export interface GetNotifRequest extends BaseRequest{
  ID: string;
}

export interface GetNotifResponse {
  Info: Notif;
}

interface _NotifReq {
  ID: string
  Notified?: boolean
}

export interface UpdateNotifsRequest extends BaseRequest{
  Infos: Array<_NotifReq>
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
