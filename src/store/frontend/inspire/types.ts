import { ReqMessage } from '../../local/notifications/types'
import { AppUser, AppUserExtra } from '../users'

interface InvitationCode {
  ID?: string
  AppID?: string
  UserID?: string
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
  CoinName: string
  Units: number
  Amount: number
  Unit: string
}

interface GoodSummary {
  GoodID: string
  CoinTypeID: string
  CoinName: string
  Units: number
  Amount: number
  Unit: string
  Percent: number
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
  GoodSummaries: Array<GoodSummary>
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
