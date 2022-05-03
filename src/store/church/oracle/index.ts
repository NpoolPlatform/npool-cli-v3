import { defineStore } from 'pinia'
import { useOracleStore } from '../../frontend'
import { doAction } from '../../action'
import { API } from './const'
import { OracleState } from './state'
import {
  CreateRewardRequest,
  CreateRewardResponse,
  UpdateRewardRequest,
  UpdateRewardResponse
} from './types'

export const useChurchOracleStore = defineStore('churchoracle', {
  state: (): OracleState => ({
    Rewards: []
  }),
  getters: {},
  actions: {
    createReward (req: CreateRewardRequest, done: () => void) {
      doAction<CreateRewardRequest, CreateRewardResponse>(
        API.CREATE_REWARD,
        req,
        req.Message,
        (resp: CreateRewardResponse): void => {
          const reward = useOracleStore()
          reward.Rewards.splice(0, 0, resp.Info)
          done()
        })
    },
    updateReward (req: UpdateRewardRequest, done: () => void) {
      doAction<UpdateRewardRequest, UpdateRewardResponse>(
        API.UPDATE_REWARD,
        req,
        req.Message,
        (resp: UpdateRewardResponse): void => {
          const reward = useOracleStore()
          const index = reward.Rewards.findIndex((el) => el.ID === resp.Info.ID)
          reward.Rewards.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
