import { NotifUser, BaseRequest, UsedFor } from '../../../base'

export interface CreateNotifUserRequest extends BaseRequest {
  AppID?: string;
  TargetUserID: string;
  EventType: UsedFor;
}

export interface CreateNotifUserResponse {
  Info: NotifUser
}

export interface DeleteNotifUserRequest extends BaseRequest {
  ID: string;
  AppID: string;
}

export interface DeleteNotifUserResponse {
  Info: NotifUser
}

export interface GetNotifUsersRequest extends BaseRequest {
  AppID?: string;
  EventType?: UsedFor;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNotifUsersResponse {
  Infos: NotifUser[];
  /** @format int64 */
  Total: number;
}

export interface GetAppNotifUsersRequest extends BaseRequest {
  TargetAppID?: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppNotifUsersResponse {
  Infos: NotifUser[];
  /** @format int64 */
  Total: number;
}
