import { Account } from '../accounts/types'
import { Coin } from '../coins/types'
import { Good } from '../goods/types'
import { BaseRequest } from '../../base'

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
  AppID: string
  UserID: string
  GoodID: string
  OrderID: string,
  AccountID: string
  StartAmount: number
  FinishAmount: number
  Amount: number,
  CoinInfoID: string
  State: string,
  ChainTransactionID: string,
  PlatformTransactionID: string
  CreateAt: number
  CoinUSDCurrency: number
  UserSetPaid: boolean
  UserSetCanceled: boolean
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

interface SubmitOrderRequest extends BaseRequest {
  GoodID: string
  Units: number
  CouponID?: string
  DiscountCouponID?: string
  UserSpecialReductionID?: string
}

interface SubmitOrderResponse {
  Info: Order
}

interface GetOrderRequest extends BaseRequest {
  ID: string
}

interface GetOrderResponse {
  Info: Order
}

interface CreatePaymentRequest extends BaseRequest {
  OrderID: string
  PaymentCoinTypeID: string
}

interface CreatePaymentResponse {
  Info: Order
}

interface UpdatePaymentRequest extends BaseRequest {
  Info: Payment
}

interface UpdatePaymentResponse {
  Info: Payment
}

interface GetOrdersRequest extends BaseRequest {
}

interface GetOrdersResponse {
  Infos: Array<Order>
}

interface GetBaseOrdersRequest extends BaseRequest {
}

interface GetBaseOrdersResponse {
  Infos: Array<OrderBase>
}

interface OrderState {
  Orders: Array<Order>
  BaseOrders: Array<OrderBase>
}

export {
  OrderBase,
  Order,
  Payment,
  SubmitOrderRequest,
  SubmitOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  OutOfGas,
  UpdatePaymentRequest,
  UpdatePaymentResponse,
  GetBaseOrdersRequest,
  GetBaseOrdersResponse,
  OrderState
}
