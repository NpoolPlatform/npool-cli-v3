import { BaseRequest, InvitationCode } from '../../../../base'

export interface CreateInvitationCodeRequest extends BaseRequest {
  TargetUserID: string;
}

export interface CreateInvitationCodeResponse {
  Info: InvitationCode;
}

export interface GetInvitationCodesRequest extends BaseRequest {
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetInvitationCodesResponse {
  Infos: InvitationCode[];
  /** @format int64 */
  Total: number;
}
