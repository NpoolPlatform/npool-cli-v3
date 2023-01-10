import { BaseRequest, InvitationCode } from '../../../../base'

export interface GetAppInvitationCodesRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppInvitationCodesResponse {
  Infos: InvitationCode[];
  /** @format int64 */
  Total: number;
}
