import { BaseRequest, NotifChannel, SendState } from '../../../base'


export interface GetAppSendStatesRequest extends BaseRequest {
  AppID?: string;
  Channel: NotifChannel;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppSendStatesResponse {
  Infos: SendState[];
  /** @format int64 */
  Total: number;
}

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

export interface GetSendStatesRequest extends BaseRequest {
  AppID: string;
  UserID: string;
  Channel: NotifChannel;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetSendStatesResponse {
  Infos: SendState[];
  /** @format int64 */
  Total: number;
}
