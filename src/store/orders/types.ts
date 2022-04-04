import { Account } from '../accounts/types'
import { Coin } from '../coins/types'
import { Good } from '../goods/types'
import { ReqMessage } from '../notifications/types'

interface OrderBase {
  ID: string
  AppID: string
  CouponID: string
  DiscountCouponID: string
  Start: number
  End: number
  GoodID: string
  Units: number
  UserID: string
  UserSpecialReductionID: string
  CreateAt: number
  PromotionID: string
}

interface Payment {
  ID: string,
  OrderID: string,
  AccountID: string
  Amount: number,
  CoinInfoID: string
  State: string,
  ChainTransactionID: string,
  PlatformTransactionID: string
  CreateAt: number
  CoinUSDCurrency: number
}

interface OutOfGas {
  ID: string
  OrderID: string
  Start: number
  End: number
}

interface MyOrder {
  Order: OrderBase
  Payment: Payment
  OutOfGases: Array<OutOfGas>
}

interface UserSpecialReduction {
  ID: string
  AppID: string
  Amount: number
  DurationDays: number
  Message: string
  Start: number
}

interface Order {
  Good: Good
  Order: MyOrder
  UserSpecialReduction: UserSpecialReduction
  PayWithCoin: Coin
  PayToAccount: Account
}

interface SubmitOrderRequest {
  GoodID: string
  Units: number
  CouponID?: string
  DiscountCouponID?: string
  UserSpecialReductionID?: string
  Message: ReqMessage
}

interface SubmitOrderResponse {
  Info: Order
}

interface GetOrderRequest {
  ID: string
  Message: ReqMessage
}

interface GetOrderResponse {
  Info: Order
}

interface CreatePaymentRequest {
  OrderID: string
  PaymentCoinTypeID: string
  Message: ReqMessage
}

interface CreatePaymentResponse {
  Info: Order
}

interface GetOrdersRequest {
  Message: ReqMessage
}

interface GetOrdersResponse {
  Infos: Array<Order>
}

interface OrderState {
  Orders: Array<Order>
}

export {
  Order,
  SubmitOrderRequest,
  SubmitOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  OutOfGas,
  OrderState
}
