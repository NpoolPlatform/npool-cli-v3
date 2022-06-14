import { BaseRequest } from '../../base'

interface RegInvitation {
  ID?: string
  AppID: string
  InviterID: string
  InviteeID: string
  CreateAt: number
}

interface GetRegInvitationsRequest extends BaseRequest {
}

interface GetRegInvitationsResponse {
  Infos: Array<RegInvitation>
}

interface UpdateRegInvitationRequest extends BaseRequest {
  Info: RegInvitation
}

interface UpdateRegInvitationResponse {
  Info: RegInvitation
}

interface RegInvitationState {
  RegInvitations: Array<RegInvitation>
}

export {
  RegInvitation,
  GetRegInvitationsRequest,
  GetRegInvitationsResponse,
  UpdateRegInvitationRequest,
  UpdateRegInvitationResponse,
  RegInvitationState
}
