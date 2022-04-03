import { Benefit } from 'src/store/benefits/types'
import { useGoodStore } from 'src/store/goods'
import { PaymentState } from 'src/store/orders/const'
import { Order } from 'src/store/orders/types'

interface BenefitModel {
  CoinTypeID: string
  Units: number
  Total: number
  Last24Hours: number
  Balance: number
}

const buildBenefits = (orders: Array<Order>, benefits: Array<Benefit>): Array<BenefitModel> => {
  const models = new Map<string, BenefitModel>()

  benefits.forEach((benefit) => {
    for (const order of orders) {
      if (order.Order.Order.ID === benefit.OrderID) {
        let model = models.get(order.Good.Main?.ID as string)
        if (!model) {
          model = {
            CoinTypeID: order.Good.Main?.ID,
            Units: 0,
            Total: 0,
            Last24Hours: 0,
            Balance: 0
          } as BenefitModel
        }

        model.Units += order.Order.Order.Units
        model.Total += benefit.Amount

        const now = new Date().getTime() / 1000
        if (benefit.CreateAt >= now - 24 * 60 * 60) {
          model.Last24Hours += benefit.Amount
        }

        models.set(order.Good.Main?.ID as string, model)
      }
    }
  })

  const myBenefits = Array.from(models).map(([, value]) => value)
  return myBenefits
}

interface OrderModel {
  OrderID: string
  CoinTypeID: string
  GoodTitle: string
  GoodType: string
  DurationDays: number
  Units: number
  CreateAt: number
  PayAmount: number
  PayCoinTypeID: string
  GoodID: string
}

enum OrderGroup {
  ALL = 'all',
  WAIT_PAY = 'waitpay',
  WAIT_START = 'waitstart',
  IN_SERVICE = 'inservice',
  OUT_OF_GAS = 'outofgas',
  END = 'end'
}

const buildOrders = (orders: Array<Order>, group: OrderGroup): Array<OrderModel> => {
  const models = [] as Array<OrderModel>
  const now = new Date().getTime() / 1000

  orders.forEach((order) => {
    switch (group) {
      case OrderGroup.WAIT_PAY:
        if (order.Order.Payment &&
            order.Order.Payment.State === PaymentState.WAIT) {
          // APPEND
        } else {
          return
        }
        break
      case OrderGroup.WAIT_START:
        if (order.Order.Payment &&
            order.Order.Payment.State === PaymentState.DONE &&
            now < order.Order.Order.Start) {
          // APPEND
        } else {
          return
        }
        break
      case OrderGroup.IN_SERVICE:
        if (order.Order.Payment &&
            order.Order.Payment.State === PaymentState.DONE &&
            order.Order.Order.Start <= now &&
            now <= order.Order.Order.End) {
          // APPEND
        } else {
          return
        }
        break
      case OrderGroup.OUT_OF_GAS:
        if (order.Order.Payment && order.Order.OutOfGases.length > 0) {
          for (const outOfGas of order.Order.OutOfGases) {
            if (outOfGas.End === 0) {
              // APPEND
              break
            }
          }
        }
        return
      case OrderGroup.END:
        if (order.Order.Payment &&
            ((order.Order.Payment.State === PaymentState.DONE && order.Order.Order.End <= now) ||
            order.Order.Payment.State === PaymentState.TIMEOUT ||
            order.Order.Payment.State === PaymentState.FAIL)) {
          // APPEND
        } else if (!order.Order.Payment) {
          // APPEND
        } else {
          return
        }
        break
    }

    const good = useGoodStore()

    models.push({
      OrderID: order.Order.Order.ID,
      CoinTypeID: order.Good.Main?.ID as string,
      GoodTitle: order.Good.Good.Good.Title,
      GoodType: good.getGoodType(order.Good),
      DurationDays: order.Good.Good.Good.DurationDays,
      Units: order.Order.Order.Units,
      CreateAt: order.Order.Order.CreateAt,
      PayAmount: order.Order.Payment?.Amount,
      PayCoinTypeID: order.PayWithCoin?.ID as string,
      GoodID: order.Good.Good.Good.ID as string
    })
  })

  return models
}

export {
  buildBenefits,
  buildOrders,
  OrderGroup,
  OrderModel
}
