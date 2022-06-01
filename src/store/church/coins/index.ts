import { defineStore } from 'pinia'
import { useCoinStore, Description, ProductInfo } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CoinState } from './state'
import {
  CreateCoinRequest,
  CreateCoinResponse,
  CreateAppDescriptionRequest,
  CreateAppDescriptionResponse,
  UpdateCoinRequest,
  UpdateCoinResponse,
  UpdateAppDescriptionRequest,
  UpdateAppDescriptionResponse,
  GetAppDescriptionsResponse,
  CreateAppProductInfoRequest,
  CreateAppProductInfoResponse,
  UpdateAppProductInfoRequest,
  UpdateAppProductInfoResponse,
  GetAppProductInfosRequest,
  GetAppProductInfosResponse
} from './types'
import { GetAppDescriptionsRequest } from '..'

export const useChurchCoinStore = defineStore('churchcoin', {
  state: (): CoinState => ({
    Descriptions: new Map<string, Array<Description>>(),
    ProductInfos: new Map<string, Array<ProductInfo>>()
  }),
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
    createDescription (req: CreateAppDescriptionRequest, done: () => void) {
      doAction<CreateAppDescriptionRequest, CreateAppDescriptionResponse>(
        API.CREATE_DESCRIPTION,
        req,
        req.Message,
        (resp: CreateAppDescriptionResponse): void => {
          let descs = this.Descriptions.get(req.TargetAppID)
          if (!descs) {
            descs = []
          }
          descs.splice(0, 0, resp.Info)
          this.Descriptions.set(req.TargetAppID, descs)
          done()
        })
    },
    updateDescription (req: UpdateAppDescriptionRequest, done: () => void) {
      doAction<UpdateAppDescriptionRequest, UpdateAppDescriptionResponse>(
        API.UPDATE_DESCRIPTION,
        req,
        req.Message,
        (resp: UpdateAppDescriptionResponse): void => {
          let descs = this.Descriptions.get(req.Info.AppID)
          if (!descs) {
            descs = []
          }
          const index = descs.findIndex((el) => el.ID === resp.Info.ID)
          descs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.Descriptions.set(req.Info.AppID, descs)
          done()
        })
    },
    getDescriptions (req: GetAppDescriptionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppDescriptionsRequest, GetAppDescriptionsResponse>(
        API.GET_DESCRIPTIONS,
        req,
        req.Message,
        (resp: GetAppDescriptionsResponse): void => {
          this.Descriptions.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createProductInfo (req: CreateAppProductInfoRequest, done: () => void) {
      doAction<CreateAppProductInfoRequest, CreateAppProductInfoResponse>(
        API.CREATE_PRODUCT_INFO,
        req,
        req.Message,
        (resp: CreateAppProductInfoResponse): void => {
          let infos = this.ProductInfos.get(req.TargetAppID)
          if (!infos) {
            infos = []
          }
          infos.splice(0, 0, resp.Info)
          this.ProductInfos.set(req.TargetAppID, infos)
          done()
        })
    },
    updateProductInfo (req: UpdateAppProductInfoRequest, done: () => void) {
      doAction<UpdateAppProductInfoRequest, UpdateAppProductInfoResponse>(
        API.UPDATE_PRODUCT_INFO,
        req,
        req.Message,
        (resp: UpdateAppProductInfoResponse): void => {
          let infos = this.ProductInfos.get(req.Info.AppID)
          if (!infos) {
            infos = []
          }
          const index = infos.findIndex((el) => el.ID === resp.Info.ID)
          infos.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.ProductInfos.set(req.Info.AppID, infos)
          done()
        })
    },
    getProductInfos (req: GetAppProductInfosRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppProductInfosRequest, GetAppProductInfosResponse>(
        API.GET_PRODUCT_INFOS,
        req,
        req.Message,
        (resp: GetAppProductInfosResponse): void => {
          this.ProductInfos.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
