import { defineStore } from 'pinia'
import { Address, WithdrawAddress } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  DeleteWithdrawAddressRequest,
  DeleteWithdrawAddressResponse,
  GetWithdrawAddressRequest,
  GetWithdrawAddressResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse
} from './types'

export const useFrontendWithdrawAddressStore = defineStore('frontend-withdrawaddress-v4', {
  state: () => ({
    WithdrawAddress: {
      WithdrawAddress: [] as Array<WithdrawAddress>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getWithdrawAddress (req: GetWithdrawAddressRequest, done: (withdrawAddress: Array<WithdrawAddress>, error: boolean) => void) {
      doActionWithError<GetWithdrawAddressRequest, GetWithdrawAddressResponse>(
        API.GET_WITHDRAW_ADDRESS,
        req,
        req.Message,
        (resp: GetWithdrawAddressResponse): void => {
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    setWithdrawAddress (req: SetWithdrawAddressRequest, done: (withdrawAddress: WithdrawAddress, error: boolean) => void) {
      doActionWithError<SetWithdrawAddressRequest, SetWithdrawAddressResponse>(
        API.SET_WITHDRAW_ADDRESS,
        req,
        req.NotifyMessage,
        (resp: SetWithdrawAddressResponse): void => {
          done(resp.Info, false)
        }, () => {
          done({} as WithdrawAddress, true)
        })
    },
    deleteWithdrawAddress (req: DeleteWithdrawAddressRequest, done: (address: Address, error: boolean) =>void) {
      doActionWithError<DeleteWithdrawAddressRequest, DeleteWithdrawAddressResponse>(
        API.DELETE_WITHDRAW_ADDRESS,
        req,
        req.Message,
        (resp: DeleteWithdrawAddressResponse): void => {
          const index = this.WithdrawAddress.WithdrawAddress.findIndex((el) => el.Address.ID === resp.Info.ID)
          this.WithdrawAddress.WithdrawAddress.splice(index, 1)
        }, () => {
          done({} as Address, true)
        })
    }
  }
})

export * from './types'
