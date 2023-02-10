import { 
  Announcement, 
  AnnouncementType, 
  BaseRequest, 
  NotifChannel 
} from '../../../base'

export interface CreateAnnouncementRequest extends BaseRequest {
  AppID: string;
  TargetLangID: string;
  Title: string;
  Content: string;
  AnnouncementType: AnnouncementType;
  Channels: NotifChannel[];
  /** @format int64 */
  EndAt: number;
}

export interface CreateAnnouncementResponse {
  Info: Announcement;
}

export interface DeleteAnnouncementRequest extends BaseRequest {
  ID: string;
}

export interface DeleteAnnouncementResponse {
  Info: Announcement;
}

export interface GetAnnouncementRequest extends BaseRequest {
  ID: string;
}

export interface GetAnnouncementResponse {
  Info: Announcement;
}

export interface GetAppAnnouncementsRequest extends BaseRequest {
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppAnnouncementsResponse {
  Infos: Announcement[];
  /** @format int64 */
  Total: number;
}

export interface GetAnnouncementsRequest extends BaseRequest {
  AppID: string;
  UserID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAnnouncementsResponse {
  Infos: Announcement[];
  /** @format int64 */
  Total: number;
}

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

export interface UpdateAnnouncementRequest extends BaseRequest {
  ID: string;
  Title: string;
  Content: string;
  Channels: NotifChannel[];
  AnnouncementType: AnnouncementType;
  /** @format int64 */
  EndAt: number;
}

export interface UpdateAnnouncementResponse {
  Info: Announcement;
}
