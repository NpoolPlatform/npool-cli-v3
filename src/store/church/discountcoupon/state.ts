import { DiscountCoupon } from '../../admin'

interface DiscountState {
  Discounts: Map<string, Array<DiscountCoupon>>
}

export {
  DiscountState
}
