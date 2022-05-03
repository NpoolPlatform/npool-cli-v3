import { BaseRequest, Cond } from '../../base'

interface Reward {
  ID?: string
  CoinTypeID: string
  DailyReward: number
}

interface GetRewardsRequest extends BaseRequest {
  Conds: Map<string, Cond>
}

interface GetRewardsResponse {
  Infos: Array<Reward>
}

interface OracleState {
  Rewards: Array<Reward>
}

export {
  Reward,
  GetRewardsRequest,
  GetRewardsResponse,
  OracleState
}
