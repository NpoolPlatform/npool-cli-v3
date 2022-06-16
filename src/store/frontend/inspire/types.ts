import { BaseRequest } from '../../base'
import { AppUser, AppUserExtra } from '../users'

interface InvitationCode {
  ID?: string
  AppID?: string
  UserID?: string
  InvitationCode?: string
}

interface GetInvitationCodeRequest extends BaseRequest {
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

interface GetReferralsRequest extends BaseRequest {
}

interface GetReferralsResponse {
  Infos: Array<Referral>
}

interface GoodCommission {
  GoodID: string
  Amount: number
  CoinTypeID: string
  CoinName: string
}

interface GetGoodCommissionsRequest extends BaseRequest {
}

interface GetGoodCommissionsResponse {
  Infos: Array<GoodCommission>
}

interface InspireState {
  InvitationCode: InvitationCode
  Referrals: Array<Referral>
  GoodCommissions: Array<GoodCommission>
}

export {
  InvitationCode,
  GetInvitationCodeRequest,
  GetInvitationCodeResponse,
  Referral,
  GetReferralsRequest,
  GetReferralsResponse,
  GoodCommission,
  GetGoodCommissionsRequest,
  GetGoodCommissionsResponse,
  InspireState
}
