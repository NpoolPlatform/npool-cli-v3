import { defineStore } from 'pinia'
import { NotSet } from '../../const'
import { doAction } from '../action'
import { API } from './const'
import { Coin, CoinState, GetCoinsRequest, GetCoinsResponse } from './types'

export const useCoinStore = defineStore('coin', {
  state: (): CoinState => ({
    Coins: []
  }),
  getters: {
    getCoinLogo (): (coin: Coin) => string {
      return (coin: Coin): string => {
        if (coin && coin.Logo.length > 0 && coin.Logo !== NotSet) {
          return coin.Logo
        }
        return 'icons/Logo.svg'
      }
    },

    getCoinByID (): (id: string) => Coin {
      return (id: string): Coin => {
        for (const coin of this.Coins) {
          if (id === coin.ID) {
            return coin
          }
        }
        return undefined as unknown as Coin
      }
    }
  },
  actions: {
    getCoins (req: GetCoinsRequest) {
      doAction<GetCoinsRequest, GetCoinsResponse>(
        API.GET_COINS,
        req,
        req.Message,
        (resp: GetCoinsResponse): void => {
          this.Coins = resp.Infos
        })
    }
  }
})

export * from './types'
