import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Detail } from '../../../base'
import { API } from './const'
import {
  GetDetailsRequest,
  GetDetailsResponse,
} from './types'

export const useFrontendDetailStore = defineStore('frontend-detail-v4', {
  state: () => ({
    Details: {
      Details: [] as Array<Detail>,
      Total: 0
    },
  }),
  getters: {
    details (): Array<Detail> {
      return this.Details.Details.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
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
    }
  }
})
