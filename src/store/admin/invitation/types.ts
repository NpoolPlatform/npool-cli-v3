import { InvitationCode } from '../../frontend'
import { BaseRequest } from '../../base'

interface UserInvitationCode extends InvitationCode {
  UserID: string
}

interface GetInvitationCodesRequest extends BaseRequest {
}

interface GetInvitationCodesResponse {
  Infos: Array<UserInvitationCode>
}

interface CreateInvitationCodeRequest extends BaseRequest {
  TargetUserID: string
  Info: UserInvitationCode
}

interface CreateInvitationCodeResponse {
  Info: UserInvitationCode
}

export {
  UserInvitationCode,
  GetInvitationCodesRequest,
  GetInvitationCodesResponse,
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse
}
