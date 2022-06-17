import { BaseRequest } from '../../base'
import { AppUser, AppUserExtra } from '../users'

interface InvitationCode {
  ID?: string
  AppID?: string
  UserID?: string
  InvitationCode?: string
  CreateAt: number
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
  AppID: string
  UserID: string
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

interface PurchaseAmountSetting {
  ID?: string
  AppID?: string
  GoodID: string
  UserID?: string
  Amount?: number
  Percent: number
  Title?: string
  BadgeLarge?: string
  BadgeSmall?: string
  Start: number
  End: number
}

interface GetPurchaseAmountSettingsRequest extends BaseRequest {
}

interface GetPurchaseAmountSettingsResponse {
  Infos: Array<PurchaseAmountSetting>
}

interface CreateSubInvitationCodeRequest extends BaseRequest {
  AppID?: string
  UserID?: string
  TargetUserID: string
  LangID?: string
  InviterName: string
  InviteeName: string
  Info: InvitationCode
}

interface CreateSubInvitationCodeResponse {
  Info: InvitationCode
}

interface CreateSubPurchaseAmountSettingRequest extends BaseRequest {
  AppID?: string
  UserID?: string
  TargetUserID: string
  LangID?: string
  InviterName: string
  InviteeName: string
  Info: PurchaseAmountSetting
}

interface CreateSubPurchaseAmountSettingResponse {
  Infos: Array<PurchaseAmountSetting>
}

interface InspireState {
  InvitationCode: InvitationCode
  Referrals: Array<Referral>
  GoodCommissions: Array<GoodCommission>
  PurchaseAmountSettings: Array<PurchaseAmountSetting>
}

export {
  InvitationCode,
  GetInvitationCodeRequest,
  GetInvitationCodeResponse,
  Referral,
  CoinSummary,
  GoodSummary,
  GetReferralsRequest,
  GetReferralsResponse,
  GoodCommission,
  GetGoodCommissionsRequest,
  GetGoodCommissionsResponse,
  PurchaseAmountSetting,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  CreateSubInvitationCodeRequest,
  CreateSubInvitationCodeResponse,
  CreateSubPurchaseAmountSettingRequest,
  CreateSubPurchaseAmountSettingResponse,
  InspireState
}
