import { useGoodStore } from '../store/goods'
import { useCurrencyStore, Currency } from '../store/currency'
import { useBenefitStore, Benefit } from '../store/benefits'
import { SecondsEachDay } from '../const'

const rangeEarningUSD = (done: (usdAmount: number) => void, start?: number, end?: number) => {
  const benefit = useBenefitStore()
  const currencys = useCurrencyStore()
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

    currencys.getCoinCurrency(good.Main.Name, Currency.USD, (currency: number) => {
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
  const start = new Date().getTime() / 1000
  const end = start + SecondsEachDay
  rangeEarningUSD(done, start, end)
}

export {
  totalEarningUSD,
  last24HoursEarningUSD,
  rangeEarningUSD
}
