import { Coin, Good, useBillingStore, useGoodStore, useOrderStore, UserPaymentBalance } from '../store'
import { useCurrencyStore, Currency } from '../store'
import { useBenefitStore, Benefit } from '../store'
import { InvalidID, ReviewState, SecondsEachDay } from '../const'
import { useTransactionStore, WithdrawType } from '../store'
import { UserWithdrawState } from '../store'
import { useCoinStore } from '../store'

const rangeEarningCurrency = (currency: Currency, done: (amount: number) => void, start?: number, end?: number) => {
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

    currencies.getCoinCurrency(good.Main as Coin, currency, (currency: number) => {
      amount += currency * benefit.Amount
      done(amount)
    })
  })

  done(amount)
}

const rangeEarningUSD = (done: (usdAmount: number) => void, start?: number, end?: number) => {
  rangeEarningCurrency(Currency.USD, done, start, end)
}

const totalEarningUSD = (done: (usdAmount: number) => void) => {
  rangeEarningUSD(done)
}

const totalEarningCurrency = (currency: Currency, done: (amount: number) => void) => {
  rangeEarningCurrency(currency, done)
}

const last24HoursEarningUSD = (done: (usdAmount: number) => void) => {
  const end = new Date().getTime() / 1000
  const start = new Date().getTime() / 1000 - SecondsEachDay
  rangeEarningUSD(done, start, end)
}

const totalWithdrawedEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void) => {
  const transaction = useTransactionStore()
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

    if (coinTypeID != withdraw.Withdraw.CoinTypeID) {
      return
    }

    amount += withdraw.Withdraw.Amount
    done(amount)
  })

  done(amount)
}

const totalWithdrawedEarningCurrency = (currency: Currency, done: (usdAmount: number) => void) => {
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
    currencies.getCoinCurrency(coin, currency, (usdAmount: number) => {
      amount += withdraw.Withdraw.Amount * usdAmount
      done(amount)
    })
  })
  done(amount)
}

const totalWithdrawedEarningUSD = (done: (usdAmount: number) => void) => {
  totalWithdrawedEarningCurrency(Currency.USD, done)
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

    const good: Good = goods.getGoodByID(benefit.GoodID)
    if (!good) {
      return
    }

    if (coinTypeID !== good.Main?.ID) {
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

const last24HoursEarningCoin = (coinTypeID: string, done: (coinAmount: number) => void) => {
  const end = new Date().getTime() / 1000
  const start = new Date().getTime() / 1000 - SecondsEachDay
  rangeEarningCoin(coinTypeID, done, start, end)
}

const rangePaymentBalanceCurrency = (currency: Currency, done: (amount: number) => void, start?: number, end?: number) => {
  const billing = useBillingStore()
  const order = useOrderStore()
  const currencies = useCurrencyStore()

  let amount = 0

  billing.PaymentBalances.forEach((balance: UserPaymentBalance) => {
    const payment = order.getPaymentByID(balance.PaymentID)

    if (balance.UsedByPaymentID !== InvalidID) {
      return
    }

    if (!payment) {
      return
    }

    if ((start && payment.CreateAt < start) ||
        (end && payment.CreateAt > end)) {
      return
    }

    const payOrder = order.getOrderByID(payment.OrderID)
    if (!payOrder) {
      return
    }

    currencies.getCoinCurrency(payOrder.PayWithCoin, currency, (currency: number) => {
      amount += currency * balance.Amount
      done(amount)
    })
  })

  done(amount)
}

const totalPaymentBalanceUSD = (done: (usdAmount: number) => void) => {
  rangePaymentBalanceCurrency(Currency.USD, done)
}

const totalPaymentBalanceCurrency = (currency: Currency, done: (usdAmount: number) => void) => {
  rangePaymentBalanceCurrency(currency, done)
}

export {
  totalEarningUSD,
  last24HoursEarningUSD,
  rangeEarningUSD,
  totalWithdrawedEarningUSD,
  rangeEarningCoin,
  last30DaysEarningCoin,
  last7DaysEarningCoin,
  last24HoursEarningCoin,
  totalEarningCoin,
  rangeEarningCurrency,
  totalWithdrawedEarningCurrency,
  totalEarningCurrency,
  totalWithdrawedEarningCoin,
  totalPaymentBalanceUSD,
  totalPaymentBalanceCurrency
}
