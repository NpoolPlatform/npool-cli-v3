import { useGoodStore } from '../store/goods'
import { useCurrencyStore, Currency } from '../store/currency'
import { useBenefitStore, Benefit } from '../store/benefits'

const totalEarningUSD = (done: (usdAmount: number) => void) => {
  const benefits = useBenefitStore()
  const currencys = useCurrencyStore()
  const goods = useGoodStore()

  let amount = 0

  benefits.forEach((benefit: Benefit) => {
    const good = goods.getGoodByID(benefit.GoodID)
    if (!good) {
      return
    }
    currencys.getCoinCurrency(good.Main.Name, Currency.USD, (currency: number) => {
      amount += currency
    })
  })

  done(amount)
}

export {
  totalEarningUSD
}
