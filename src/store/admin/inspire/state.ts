import { CommissionCoinSetting, CommissionSetting, InvitationCode, PurchaseAmountSetting } from './types'

interface InspireState {
  InvitationCodes: Array<InvitationCode>
  PurchaseAmountSettings: Array<PurchaseAmountSetting>
  CommissionSetting: CommissionSetting
  CommissionCoinSettings: Array<CommissionCoinSetting>
}

export {
  InspireState
}
