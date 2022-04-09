import { defineStore } from 'pinia'
import { doGet } from '../action'
import { Coin, useCoinStore } from '../coins'
import { NotificationType } from '../notifications'
import { API, Currency } from './const'
import { CurrencyState, GetCoinsCurrenciesRequest } from './types'
import { useI18n } from 'vue-i18n'

export const useCurrencyStore = defineStore('currency', {
  state: (): CurrencyState => ({
    Currencies: new Map<string, Map<string, number>>(),
    I18n: useI18n()
  }),
  getters: {
    getExchangeCoinName (): (coin: Coin) => string {
      return (coin: Coin) => {
        return coin.Name.replaceAll(/^t/g, '').toLowerCase()
      }
    }
  },
  actions: {
    getCoinCurrencies (req: GetCoinsCurrenciesRequest, done: () => void) {
      const coins = new Map<string, string>()
      const coin = useCoinStore()
      coin.Coins.forEach((coin: Coin) => {
        coins.set(this.getExchangeCoinName(coin), coin.Name)
      })
      const ids = Array.from(coins).map(([key, ]) => key).join(',')
      const url = API.GET_COINS_CURRENCIES + '?ids=' + ids + '&vs_currencies=' + req.Currencies.join(',')
      doGet<GetCoinsCurrenciesRequest, Map<string, Map<string, number>>>(
        url,
        req,
        req.Message,
        (resp: Map<string, Map<string, number>>): void => {
          resp.forEach((amounts: Map<string, number>, key: string) => {
            const myAmounts = this.Currencies.get(key)
            if (!myAmounts) {
              this.Currencies.set(key, amounts)
              return
            }
            amounts.forEach((amount: number, cur: string) => {
              myAmounts.set(cur, amount)
            })
            this.Currencies.set(key, myAmounts)
          })
          done()
        })
    },
    getCoinCurrency (coin: Coin, currency: Currency, done: (currency: number) => void) {
      const amount = this.Currencies.get(this.getExchangeCoinName(coin))?.get(currency)
      if (amount !== undefined) {
        done(amount)
        return
      }

      this.getCoinCurrencies({
        Currencies: [currency],
        Message: {
          Error: {
            Title: this.I18n.t('MSG_GET_CURRENCIES'),
            Message: this.I18n.t('MSG_GET_CURRENCIES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      }, () => {
        this.getCoinCurrency(coin, currency, done)
      })
    }
  }
})

export * from './types'
export { Currency } from './const'
