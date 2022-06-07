import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import {
  CreateCoinGasRequest,
  CreateCoinGasResponse,
  GasFeederState,
  GetCoinGasesRequest,
  GetCoinGasesResponse,
  GetDepositsRequest,
  GetDepositsResponse,
  UpdateCoinGasRequest,
  UpdateCoinGasResponse
} from './types'
import { API } from './const'

export const useChurchGasFeederStore = defineStore('churchgasfeeder', {
  state: (): GasFeederState => ({
    CoinGases: [],
    Deposits: []
  }),
  getters: {},
  actions: {
    getCoinGases (req: GetCoinGasesRequest, done: (error: boolean) => void) {
      doActionWithError<GetCoinGasesRequest, GetCoinGasesResponse>(
        API.GET_COINGASES,
        req,
        req.Message,
        (resp: GetCoinGasesResponse): void => {
          this.CoinGases = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createCoinGas (req: CreateCoinGasRequest, done: () => void) {
      doAction<CreateCoinGasRequest, CreateCoinGasResponse>(
        API.CREATE_COINGAS,
        req,
        req.Message,
        (resp: CreateCoinGasResponse): void => {
          this.CoinGases.splice(0, 0, resp.Info)
          done()
        })
    },
    updateCoinGas (req: UpdateCoinGasRequest, done: () => void) {
      doAction<UpdateCoinGasRequest, UpdateCoinGasResponse>(
        API.UPDATE_COINGAS,
        req,
        req.Message,
        (resp: UpdateCoinGasResponse): void => {
          const index = this.CoinGases.findIndex((el) => el.ID === req.Info.ID)
          this.CoinGases.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    getDeposits (req: GetDepositsRequest, done: (error: boolean) => void) {
      doActionWithError<GetDepositsRequest, GetDepositsResponse>(
        API.GET_DEPOSITS,
        req,
        req.Message,
        (resp: GetDepositsResponse): void => {
          this.Deposits = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
  }
})

export * from './types'

