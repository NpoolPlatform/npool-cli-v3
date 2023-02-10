import { BaseRequest, Announcement } from '../../../base'

export interface GetNAppAnnouncementsRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNAppAnnouncementsResponse {
  Infos: Announcement[];
  /** @format int64 */
  Total: number;
}
