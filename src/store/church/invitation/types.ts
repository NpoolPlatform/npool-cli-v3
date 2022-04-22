import { InvitationCode } from '../../frontend'
import {
  CreateInvitationCodeRequest,
  GetInvitationCodesRequest,
  GetInvitationCodesResponse,
  CreateInvitationCodeResponse
} from '../../admin'

interface GetAppInvitationCodesRequest extends GetInvitationCodesRequest {
  TargetAppID: string
}

interface GetAppInvitationCodesResponse extends GetInvitationCodesResponse {
}

interface CreateAppInvitationCodeRequest extends CreateInvitationCodeRequest {
  TargetAppID: string
}

interface CreateAppInvitationCodeResponse extends CreateInvitationCodeResponse {
  Info: InvitationCode
}

export {
  GetAppInvitationCodesRequest,
  GetAppInvitationCodesResponse,
  CreateAppInvitationCodeRequest,
  CreateAppInvitationCodeResponse
}
