import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetRewardsRequest,
  GetRewardsResponse,
  OracleState,
  Reward
} from './types'

export const useOracleStore = defineStore('oracle', {
  state: (): OracleState => ({
    Rewards: []
  }),
  getters: {
    getRewardByCoinID (): (coinID: string) => Reward {
      return (coinID: string) => {
        const index = this.Rewards.findIndex((el) => el.CoinTypeID === coinID)
        return index < 0 ? undefined as unknown as Reward : this.Rewards[index]
      }
    }
  },
  actions: {
    getRewards (req: GetRewardsRequest, done: (error: boolean) => void) {
      doActionWithError<GetRewardsRequest, GetRewardsResponse>(
        API.GET_REWARDS,
        req,
        req.Message,
        (resp: GetRewardsResponse): void => {
          this.Rewards = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
