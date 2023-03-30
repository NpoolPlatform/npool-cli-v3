import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Detail, MiningReward } from '../../../base'
import { API } from './const'
import {
  GetDetailsRequest,
  GetDetailsResponse,
  GetMiningRewardsRequest,
  GetMiningRewardsResponse,
} from './types'

export const useFrontendDetailStore = defineStore('frontend-detail-v4', {
  state: () => ({
    Details: {
      Details: [] as Array<Detail>,
      Total: 0
    },
    MiningRewards: {
      MiningRewards: [] as Array<MiningReward>,
      Total: 0
    },
  }),
  getters: {
    details (): Array<Detail> {
      return this.Details.Details.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    getMiningRewardsByOrderID () {
      return (orderID: string) => {
        return this.MiningRewards.MiningRewards.filter((el) => el.OrderID === orderID).reduce((prev, curr) => prev + Number(curr.RewardAmount), 0)
      }
    }
  },
  actions: {
    getDetails (req: GetDetailsRequest, done: (error: boolean, rows: Array<Detail>) => void) {
      doActionWithError<GetDetailsRequest, GetDetailsResponse>(
        API.GET_DETAILS,
        req,
        req.Message,
        (resp: GetDetailsResponse): void => {
          this.Details.Details.push(...resp.Infos)
          this.Details.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Detail>)
        }
      )
    },
    getMiningRewards (req: GetMiningRewardsRequest, done: (error: boolean, rows: Array<MiningReward>) => void) {
      doActionWithError<GetMiningRewardsRequest, GetMiningRewardsResponse>(
        API.GET_MININGREWARDS,
        req,
        req.Message,
        (resp: GetMiningRewardsResponse): void => {
          this.MiningRewards.MiningRewards.push(...resp.Infos)
          this.MiningRewards.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<MiningReward>)
        }
      )
    }
  }
})
