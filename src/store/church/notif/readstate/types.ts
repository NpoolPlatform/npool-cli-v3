import { BaseRequest, ReadState } from '../../../base'

export interface GetAppUserReadStatesRequest extends BaseRequest {
  TargetAppID: string;
  TargetUserID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetAppUserReadStatesResponse {
  Infos: ReadState[];
  /** @format int64 */
  Total: number;
}

export interface GetNAppReadStatesRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int64 */
  Offset: number;
  /** @format int64 */
  Limit: number;
}

export interface GetNAppReadStatesResponse {
  Infos: ReadState[];
  /** @format int64 */
  Total: number;
}
