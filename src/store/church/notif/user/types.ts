import { AnnouncementUser, BaseRequest } from '../../../base'

export interface GetNAppAnnouncementUsersRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNAppAnnouncementUsersResponse {
  Infos: AnnouncementUser[];
  /** @format int64 */
  Total: number;
}
