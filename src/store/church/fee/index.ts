import { defineStore } from 'pinia'
import { useGoodStore } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CreateFeeRequest, CreateFeeResponse, CreateFeeTypeRequest, CreateFeeTypeResponse, FeeState, GetFeesRequest, GetFeesResponse, UpdateFeeTypeRequest, UpdateFeeTypeResponse } from './types'

export const useFeeStore = defineStore('fee', {
  state: (): FeeState => ({
    Fees: []
  }),
  getters: {},
  actions: {
    getFees (req: GetFeesRequest, done: (error: boolean) => void) {
      doActionWithError<GetFeesRequest, GetFeesResponse>(
        API.GET_FEES,
        req,
        req.Message,
        (resp: GetFeesResponse): void => {
          this.Fees = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createFee (req: CreateFeeRequest, done: () => void) {
      doAction<CreateFeeRequest, CreateFeeResponse>(
        API.CREATE_FEE,
        req,
        req.Message,
        (resp: CreateFeeResponse): void => {
          this.Fees.splice(0, 0, resp.Info)
          done()
        })
    },
    createFeeType (req: CreateFeeTypeRequest, done: () => void) {
      doAction<CreateFeeTypeRequest, CreateFeeTypeResponse>(
        API.CREATE_FEE_TYPE,
        req,
        req.Message,
        (resp: CreateFeeTypeResponse): void => {
          const feetype = useGoodStore()
          feetype.FeeTypes.splice(0, 0, resp.Info)
          done()
        })
    },
    updateFeeType (req: UpdateFeeTypeRequest, done: () => void) {
      doAction<UpdateFeeTypeRequest, UpdateFeeTypeResponse>(
        API.UPDATE_FEE_TYPE,
        req,
        req.Message,
        (resp: UpdateFeeTypeResponse): void => {
          const feetype = useGoodStore()
          const index = feetype.FeeTypes.findIndex((el) => el.ID === resp.Info.ID)
          feetype.FeeTypes.splice(index< 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
