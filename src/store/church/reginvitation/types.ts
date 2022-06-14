import { GetRegInvitationsRequest, RegInvitation } from '../../admin'

interface GetAppRegInvitationsRequest extends GetRegInvitationsRequest {
  TargetAppID: string
}

interface GetAppRegInvitationsResponse {
  Infos: Array<RegInvitation>
}

export {
  GetAppRegInvitationsRequest,
  GetAppRegInvitationsResponse
}
