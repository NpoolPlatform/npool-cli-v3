import { BaseRequest, NotifChannel, TNotifChannel, UsedFor } from '../../../base';


export interface CreateNotifChannelRequest extends BaseRequest {
  AppID?: string;
  EventType: UsedFor;
  Channel: NotifChannel;
}

export interface CreateNotifChannelResponse {
  Info: TNotifChannel;
}

export interface DeleteNotifChannelRequest extends BaseRequest {
  ID: string;
  AppID?: string;
}

export interface DeleteNotifChannelResponse {
  Info: TNotifChannel;
}

export interface GetAppNotifChannelsRequest extends BaseRequest {
  AppID?: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppNotifChannelsResponse {
  Infos: TNotifChannel[];
  /** @format int64 */
  Total: number;
}

export interface GetNAppNotifChannelsRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNAppNotifChannelsResponse {
  Infos: TNotifChannel[];
  /** @format int64 */
  Total: number;
}