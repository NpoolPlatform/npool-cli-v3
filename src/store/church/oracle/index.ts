import { defineStore } from 'pinia'
import { useOracleStore } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { OracleState } from './state'
import {
  CreateAppCurrencyRequest,
  CreateAppCurrencyResponse,
  CreateRewardRequest,
  CreateRewardResponse,
  GetAppCurrenciesRequest,
  GetAppCurrenciesResponse,
  UpdateRewardRequest,
  UpdateRewardResponse
} from './types'
import {
  CoinCurrency,
  UpdateCurrencyRequest,
  UpdateCurrencyResponse
} from '../../admin'
import { API as CurrencyAPI } from '../../admin/oracle/const'

export const useChurchOracleStore = defineStore('churchoracle', {
  state: (): OracleState => ({
    Currencies: new Map<string, Array<CoinCurrency>>()
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
    },
    createCurrency (req: CreateAppCurrencyRequest, done: () => void) {
      doAction<CreateAppCurrencyRequest, CreateAppCurrencyResponse>(
        API.CREATE_CURRENCY,
        req,
        req.Message,
        (resp: CreateAppCurrencyResponse): void => {
          let currencies = this.Currencies.get(req.TargetAppID)
          if (!currencies) {
            currencies = []
          }
          currencies.splice(0, 0, resp.Info)
          this.Currencies.set(req.TargetAppID, currencies)
          done()
        })
    },
    updateCurrency (req: UpdateCurrencyRequest, done: () => void) {
      doAction<UpdateCurrencyRequest, UpdateCurrencyResponse>(
        CurrencyAPI.UPDATE_CURRENCY,
        req,
        req.Message,
        (resp: UpdateCurrencyResponse): void => {
          const currencies = this.Currencies.get(req.Info.AppID) as Array<CoinCurrency>
          const index = currencies.findIndex((el) => el.ID === req.Info.ID)
          currencies.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.Currencies.set(req.Info.AppID, currencies)
          done()
        })
    },
    getCurrencies (req: GetAppCurrenciesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppCurrenciesRequest, GetAppCurrenciesResponse>(
        API.GET_CURRENCIES,
        req,
        req.Message,
        (resp: GetAppCurrenciesResponse): void => {
          this.Currencies.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
