import { AnnouncementUser, BaseRequest } from '../../../base'

export interface CreateAnnouncementUserRequest extends BaseRequest {
  AppID?: string;
  TargetUserID: string;
  AnnouncementID: string;
}

export interface CreateAnnouncementUserResponse {
  Info: AnnouncementUser
}

export interface DeleteAnnouncementUserRequest extends BaseRequest {
  ID: string;
  AppID: string;
}

export interface DeleteAnnouncementUserResponse {
  Info: AnnouncementUser
}

export interface GetAnnouncementUsersRequest extends BaseRequest {
  AppID?: string;
  AnnouncementID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAnnouncementUsersResponse {
  Infos: AnnouncementUser[];
  /** @format int64 */
  Total: number;
}

export interface GetAppAnnouncementUsersRequest extends BaseRequest {
  AppID?: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppAnnouncementUsersResponse {
  Infos: AnnouncementUser[];
  /** @format int64 */
  Total: number;
}
