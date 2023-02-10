import { BaseRequest, NotifChannel, SendState } from '../../../base'

export interface GetAppUserSendStatesRequest extends BaseRequest {
  TargetAppID: string;
  TargetUserID: string;
  Channel: NotifChannel;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppUserSendStatesResponse {
  Infos: SendState[];
  /** @format int64 */
  Total: number;
}

export interface GetNAppSendStatesRequest extends BaseRequest {
  TargetAppID: string;
  Channel: NotifChannel;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNAppSendStatesResponse {
  Infos: SendState[];
  /** @format int64 */
  Total: number;
}
