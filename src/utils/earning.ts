import { useGoodStore } from '../store/goods'
import { useCurrencyStore, Currency } from '../store/currency'
import { useBenefitStore, Benefit } from '../store/benefits'
import { ReviewState, SecondsEachDay } from '../const'
import { useTransactionStore, WithdrawType } from '../store/transactions'
import { UserWithdrawState } from '../store/transactions'
import { useCoinStore } from '../store/coins'

const rangeEarningUSD = (done: (usdAmount: number) => void, start?: number, end?: number) => {
  const benefit = useBenefitStore()
  const currencies = useCurrencyStore()
  const goods = useGoodStore()

  let amount = 0

  benefit.Benefits.forEach((benefit: Benefit) => {
    if ((start && benefit.CreateAt < start) ||
        (end && benefit.CreateAt > end)) {
      return
    }

    const good = goods.getGoodByID(benefit.GoodID)
    if (!good) {
      return
    }

    currencies.getCoinCurrency(good.Main.Name, Currency.USD, (currency: number) => {
      amount += currency * benefit.Amount
      done(amount)
    })
  })

  done(amount)
}

const totalEarningUSD = (done: (usdAmount: number) => void) => {
  rangeEarningUSD(done)
}

const last24HoursEarningUSD = (done: (usdAmount: number) => void) => {
  const end = new Date().getTime() / 1000
  const start = new Date().getTime() / 1000 - SecondsEachDay
  rangeEarningUSD(done, start, end)
}

const totalWithdrawedEarningUSD = (done: (usdAmount: number) => void) => {
  const transaction = useTransactionStore()
  const currencies = useCurrencyStore()
  const coins = useCoinStore()

  let amount = 0
  transaction.Withdraws.forEach((withdraw: UserWithdrawState) => {
    if (withdraw.State !== ReviewState.Approved) {
      return
    }
    if (withdraw.Withdraw.WithdrawType != WithdrawType.Benefit) {
      return
    }
    let found = false
    for (const tx of transaction.Transactions) {
      if (tx.ID === withdraw.Withdraw.PlatformTransactionID) {
        found = true
        break
      }
    }
    if (!found) {
      return
    }
    const coin = coins.getCoinByID(withdraw.Withdraw.CoinTypeID)
    currencies.getCoinCurrency(coin, Currency.USD, (usdAmount: number) => {
      amount += withdraw.Withdraw.Amount * usdAmount
      done(amount)
    })
  })
  done(amount)
}

const rangeEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void, start?: number, end?: number) => {
  const benefit = useBenefitStore()
  const goods = useGoodStore()

  let amount = 0
  benefit.Benefits.forEach((benefit: Benefit) => {
    if ((start && benefit.CreateAt < start) ||
        (end && benefit.CreateAt > end)) {
      return
    }

    const good = goods.getGoodByID(benefit.GoodID)
    if (!good) {
      return
    }

    amount += benefit.Amount
    done(amount)
  })

  done(amount)
}

const totalEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void) => {
  rangeEarningCoin(coinTypeID, done)
}

const last30DaysEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void) => {
  const end = new Date().getTime() / 1000
  const start = new Date().getTime() / 1000 - SecondsEachDay * 30
  rangeEarningCoin(coinTypeID, done, start, end)
}

const last7DaysEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void) => {
  const end = new Date().getTime() / 1000
  const start = new Date().getTime() / 1000 - SecondsEachDay * 7
  rangeEarningCoin(coinTypeID, done, start, end)
}

const las24HoursEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void) => {
  const end = new Date().getTime() / 1000
  const start = new Date().getTime() / 1000 - SecondsEachDay
  rangeEarningCoin(coinTypeID, done, start, end)
}

export {
  totalEarningUSD,
  last24HoursEarningUSD,
  rangeEarningUSD,
  totalWithdrawedEarningUSD,
  rangeEarningCoin,
  last30DaysEarningCoin,
  last7DaysEarningCoin,
  las24HoursEarningCoin,
  totalEarningCoin
}
