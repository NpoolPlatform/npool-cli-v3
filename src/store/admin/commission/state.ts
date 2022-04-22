import {
  CommissionCoinSetting,
  CommissionSetting
} from './types'

interface CommissionState {
  CommissionSetting: CommissionSetting
  CommissionCoinSettings: Array<CommissionCoinSetting>
}

export {
  CommissionState
}
