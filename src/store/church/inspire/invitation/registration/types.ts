import { BaseRequest, Registration } from '../../../../base'

export interface GetAppRegistrationsRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppRegistrationsResponse {
  Infos: Registration[];
  /** @format int64 */
  Total: number;
}
