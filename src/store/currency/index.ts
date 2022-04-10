import { defineStore } from 'pinia'
import { doGet } from '../action'
import { Coin, useCoinStore } from '../coins'
import { NotificationType } from '../notifications'
import { API, CoinType, Currency } from './const'
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
    getCoinCurrencies (req: GetCoinsCurrenciesRequest, coinNames: Array<string>, done: () => void) {
      const ids = coinNames.join(',')
      const url = API.GET_COINS_CURRENCIES + '?ids=' + ids + '&vs_currencies=' + req.Currencies.join(',')
      doGet<GetCoinsCurrenciesRequest, Map<string, Map<string, number>>>(
        url,
        req,
        req.Message,
        (resp: Map<string, Map<string, number>>): void => {
          for (const [coin, map] of Object.entries(resp)) {
            let myAmounts = this.Currencies.get(coin)
            if (!myAmounts) {
              myAmounts = new Map<string, number>()
            }
            for (const [currency, amount] of Object.entries(map)) {
              myAmounts.set(currency, amount)
            }
            this.Currencies.set(coin, myAmounts)
          }
          done()
        })
    },
    getAllCoinCurrencies (req: GetCoinsCurrenciesRequest, done: () => void) {
      const coins = new Map<string, string>()
      const coin = useCoinStore()
      coin.Coins.forEach((coin: Coin) => {
        coins.set(this.getExchangeCoinName(coin), coin.Name)
      })
      const ids = Array.from(coins).map(([key, ]) => key)
      this.getCoinCurrencies(req, ids, done)
    },
    getCoinCurrencyByCoinName (coinName: string, currency: Currency, done: (currency: number) => void) {
      const amount = this.Currencies.get(coinName)?.get(currency)
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
      }, [coinName], () => {
        this.getCoinCurrencyByCoinName(coinName, currency, done)
      })
    },
    getCoinCurrency (coin: Coin, currency: Currency, done: (currency: number) => void) {
      this.getCoinCurrencyByCoinName(this.getExchangeCoinName(coin), currency, done)
    },
    getUSDTCurrency (currency: Currency, done: (currency: number) => void) {
      this.getCoinCurrencyByCoinName(CoinType.USDTERC20, currency, done)
    },
    getCoinNameCurrency (coinName: string, currency: Currency, done: (currency: number) => void) {
      this.getCoinCurrencyByCoinName(coinName, currency, done)
    }
  }
})

export * from './types'
export { Currency, CoinType, PrideCoinName } from './const'
