import { BaseRequest, ReadState } from '../../../base'


export interface CreateReadStateRequest extends BaseRequest {
  AppID: string;
  UserID: string;
  AnnouncementID: string;
}

export interface CreateReadStateResponse {
  Info: ReadState;
}

export interface GetAppReadStatesRequest extends BaseRequest {
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppReadStatesResponse {
  Infos: ReadState[];
  /** @format int64 */
  Total: number;
}

