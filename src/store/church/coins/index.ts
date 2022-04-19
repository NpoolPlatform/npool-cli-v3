import { defineStore } from 'pinia'
import { useCoinStore, Description } from '../../frontend'
import { doAction } from '../../action'
import { API } from './const'
import { CoinState } from './state'
import {
  CreateCoinRequest,
  CreateCoinResponse,
  CreateDescriptionRequest,
  CreateDescriptionResponse,
  UpdateCoinRequest,
  UpdateCoinResponse,
  UpdateDescriptionRequest,
  UpdateDescriptionResponse
} from './types'

export const useChurchCoinStore = defineStore('churchcoin', {
  state: (): CoinState => ({}),
  getters: {},
  actions: {
    createCoin (req: CreateCoinRequest, done: () => void) {
      doAction<CreateCoinRequest, CreateCoinResponse>(
        API.CREATE_COIN,
        req,
        req.Message,
        (resp: CreateCoinResponse): void => {
          const coin = useCoinStore()
          coin.Coins.push(resp.Info)
          done()
        })
    },
    updateCoin (req: UpdateCoinRequest, done: () => void) {
      doAction<UpdateCoinRequest, UpdateCoinResponse>(
        API.UPDATE_COIN,
        req,
        req.Message,
        (resp: UpdateCoinResponse): void => {
          const coin = useCoinStore()
          const index = coin.Coins.findIndex((el) => el.ID === resp.Info.ID)
          coin.Coins.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    createDescription (req: CreateDescriptionRequest, done: () => void) {
      doAction<CreateDescriptionRequest, CreateDescriptionResponse>(
        API.CREATE_DESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: CreateDescriptionResponse): void => {
          const coin = useCoinStore()
          let descs = coin.Descriptions.get(req.CoinTypeID)
          if (!descs) {
            descs = new Map<string, Description>()
          }
          descs.set(req.UsedFor, resp.Info)
          coin.Descriptions.set(req.CoinTypeID, descs)
          done()
        })
    },
    updateDescription (req: UpdateDescriptionRequest, done: () => void) {
      doAction<UpdateDescriptionRequest, UpdateDescriptionResponse>(
        API.UPDATE_DESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: UpdateDescriptionResponse): void => {
          const coin = useCoinStore()
          let descs = coin.Descriptions.get(req.CoinTypeID)
          if (!descs) {
            descs = new Map<string, Description>()
          }
          descs.set(req.UsedFor, resp.Info)
          coin.Descriptions.set(req.CoinTypeID, descs)
          done()
        })
    }
  }
})

export * from './types'
