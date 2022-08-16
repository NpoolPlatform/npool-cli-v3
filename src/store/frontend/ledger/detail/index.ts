import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from 'src/store/action'

import {
  Detail,
  GetDetailsRequest,
  GetDetailsResponse
} from './types'
export const useDetailStore = defineStore('detail', {
  state: () => ({
    Details: {
      Details: [] as Array<Detail>,
      Total: 0
    }
  }),
  getters: {
    details(): Array<Detail>  {
      return this.Details.Details.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getDetails (req: GetDetailsRequest, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetDetailsRequest, GetDetailsResponse>(
        API.GET_DETAILS,
        req,
        req.Message,
        (resp: GetDetailsResponse): void => {
          resp.Infos.forEach((el: Detail) => {
            this.Details.Details.push(el)
          })
          this.Details.Total = resp.Total
          done(false, resp.Infos.length)
        },
        () => {
          done(true)
        }
      )
    },
  }
})