import { ReqMessage } from '../../local/notifications/types'
import { AppUser, AppUserExtra } from '../users'

interface InvitationCode {
  ID?: string
  InvitationCode?: string
}

interface GetInvitationCodeRequest {
  Message: ReqMessage
}

interface GetInvitationCodeResponse {
  Info: InvitationCode
}

interface Invitation {
  ID: string
  CreateAt: number
}

interface CoinSummary {
  CoinTypeID: string
  Units: number
  Amount: number
  Unit: string
  CoinName: string
}

interface Referral {
  User: AppUser
  Extra: AppUserExtra
  Invitation: Invitation
  USDAmount: number
  SubUSDAmount: number
  Kol: boolean
  InvitedCount: number
  Summaries: Array<CoinSummary>
}

interface GetReferralsRequest {
  Message: ReqMessage
}

interface GetReferralsResponse {
  Infos: Array<Referral>
}


interface InspireState {
  InvitationCode: InvitationCode
  Referrals: Array<Referral>
}

export {
  InvitationCode,
  GetInvitationCodeRequest,
  GetInvitationCodeResponse,
  Referral,
  GetReferralsRequest,
  GetReferralsResponse,
  InspireState
}
