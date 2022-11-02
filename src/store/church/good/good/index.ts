import { defineStore } from 'pinia'
import { Good } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { CreateGoodRequest, CreateGoodResponse, GetGoodRequest, GetGoodResponse, GetGoodsRequest, GetGoodsResponse, UpdateGoodRequest, UpdateGoodResponse } from './types'

export const useChurchGoodStore = defineStore('church-good-v4', {
  state: () => ({
    Goods: {
      Goods: [] as Array<Good>,
      Total: 0
    }
  }),
  getters: {
    getGoodByID() {
      return (goodID: string) => this.Goods.Goods.find((el) => el.ID === goodID)
    }
  },
  actions: {
    getGoods (req: GetGoodsRequest, done: (goods: Array<Good>, error: boolean) => void) {
      doActionWithError<GetGoodsRequest, GetGoodsResponse>(
        API.GET_GOODS,
        req,
        req.Message,
        (resp: GetGoodsResponse): void => {
          this.Goods.Goods.push(...resp.Infos)
          this.Goods.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    getGood (req: GetGoodRequest, done: (good: Good, error: boolean) => void) {
      doActionWithError<GetGoodRequest, GetGoodResponse>(
        API.GET_GOOD,
        req,
        req.Message,
        (resp: GetGoodResponse): void => {
          const index = this.Goods.Goods.findIndex((el) => el.ID === resp.Info.ID)
          this.Goods.Goods.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as Good, true)
        })
    },
    updateGood (req: UpdateGoodRequest, done: (good: Good, error: boolean) => void) {
      doActionWithError<UpdateGoodRequest, UpdateGoodResponse>(
        API.UPDATE_GOOD,
        req,
        req.Message,
        (resp: UpdateGoodResponse): void => {
          const index = this.Goods.Goods.findIndex((el) => el.ID === resp.Info.ID)
          this.Goods.Goods.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as Good, true)
        })
    },
    createGood (req: CreateGoodRequest, done: (good: Good, error: boolean) => void) {
      doActionWithError<CreateGoodRequest, CreateGoodResponse>(
        API.CREATE_GOOD,
        req,
        req.Message,
        (resp: CreateGoodResponse): void => {
          this.Goods.Goods.push(resp.Info)
          this.Goods.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Good, true)
        })
    }
  }
})
