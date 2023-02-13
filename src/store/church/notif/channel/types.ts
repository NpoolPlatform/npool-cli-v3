import { BaseRequest, TNotifChannel as NotifChannel } from '../../../base'

export interface GetNAppNotifChannelsRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNAppNotifChannelsResponse {
  Infos: NotifChannel[];
  /** @format int64 */
  Total: number;
}
