import { InvitationCode } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetInvitationCodesRequest extends BaseRequest {
}

interface GetInvitationCodesResponse {
  Infos: Array<InvitationCode>
}

interface CreateInvitationCodeRequest extends BaseRequest {
  TargetUserID: string
  Info: InvitationCode
}

interface CreateInvitationCodeResponse {
  Info: InvitationCode
}

export {
  GetInvitationCodesRequest,
  GetInvitationCodesResponse,
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse
}
