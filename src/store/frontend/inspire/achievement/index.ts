import { defineStore } from 'pinia'
import { GoodArchivement, UserArchivement } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  GetGoodArchivementsRequest,
  GetGoodArchivementsResponse
} from './types'

export const useFrontendArchivementStore = defineStore('frontend-archivement-v4', {
  state: () => ({
    Archivements: {
      Archivements: [] as Array<UserArchivement>,
      Total: 0
    }
  }),
  getters: {
    getArchivementByUserID () {
      return (userID: string) => this.Archivements.Archivements.find((el) => el.UserID === userID)
    },
    getInviteesArchivements () {
      return (userID: string) => this.Archivements.Archivements.filter((el) => el.UserID !== userID && el.Kol)
    },
    getInviterGoodPercent() {
      return (archivement: UserArchivement, goodID: string) => {
        const good = archivement.Archivements.find((el) => el.GoodID === goodID)
        return !good? 0 : good.CommissionPercent 
      }
    },
    subUsername() {
      return (archivement: UserArchivement) => {
        return archivement.EmailAddress.length > 0 ? archivement.EmailAddress : archivement.PhoneNO
      }
    },
    getTotalCommission() {
      return (userID: string) => {
        let total = 0
        this.getArchivementByUserID(userID)?.Archivements.forEach((el) => {
          total += Number(el.TotalCommission)
        })
        return total
      }
    },
    totalUnits () {
      return (rows: Array<UserArchivement>, coinTypeID: string) => {
        let total = 0
        rows.forEach((el) => {
          el.Archivements.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => {
            total += el.TotalUnits
          })
        })
        return total
      }
    },
    totalAmount () {
      return (rows: Array<UserArchivement>, coinTypeID: string) => {
        let total = 0
        rows.forEach((el) => {
          el.Archivements.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => {
            total += Number(el.TotalAmount)
          })
        })
        return total
      }
    },
    totalCommission () {
      return (rows: Array<UserArchivement>, coinTypeID: string) => {
        let total = 0
        rows.forEach((el) => {
          el.Archivements.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => {
            total += Number(el.TotalCommission)
          })
        })
        return total
      }
    },
    userTotalUnits () {
      return (rows: Array<GoodArchivement>, coinTypeID: string) => {
        let total = 0
        rows.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => {
          total += el.TotalUnits
        })
        return total
      } 
    },
    userTotalAmount () {
      return (rows: Array<GoodArchivement>, coinTypeID: string) => {
        let total = 0
        rows.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => {
          total += Number(el.TotalAmount)
        })
        return total
      } 
    },
    userTotalCommission () {
      return (rows: Array<GoodArchivement>, coinTypeID: string) => {
        let total = 0
        rows.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => {
          total += Number(el.TotalCommission)
        })
        return total
      } 
    },
    notKolUsers() {
      return () => this.Archivements.Archivements.filter((el) => !el.Kol).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getGoodArchivements (req: GetGoodArchivementsRequest, done: (error: boolean, rows: Array<UserArchivement>,) => void) {
      doActionWithError<GetGoodArchivementsRequest, GetGoodArchivementsResponse>(
        API.GET_GOODARCHIVEMENTS,
        req,
        req.Message,
        (resp: GetGoodArchivementsResponse): void => {
          this.Archivements.Archivements.push(...resp.Archivements)
          done(false, resp.Archivements)
        },
        () => {
          done(true, [] as Array<UserArchivement>)
        }
      )
    }
  }
})
