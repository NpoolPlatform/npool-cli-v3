import { CommissionCoinSetting, CommissionSetting, UserInvitationCode, PurchaseAmountSetting } from './types'

interface InspireState {
  InvitationCodes: Array<UserInvitationCode>
  PurchaseAmountSettings: Array<PurchaseAmountSetting>
  CommissionSetting: CommissionSetting
  CommissionCoinSettings: Array<CommissionCoinSetting>
}

export {
  InspireState
}
