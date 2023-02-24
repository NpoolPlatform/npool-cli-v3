import { Order, BaseRequest, OrderType } from '../../../base'

export interface GetNAppOrdersRequest extends BaseRequest {
  TargetAppID: string;
  Offset?: number;
  Limit?: number;
}

export interface GetNAppOrdersResponse {
  Infos: Array<Order>;
  Total: number;
}

export interface CreateAppUserOrderRequest extends BaseRequest {
  TargetAppID: string;
  TargetUserID: string;
  GoodID: string;
  Units: string;
  PaymentCoinID?: string;
  ParentOrderID?: string;
  PayWithBalanceAmount?: string;
  FixAmountID?: string;
  DiscountID?: string;
  SpecialOfferID?: string;
  OrderType?: OrderType;
}

export interface CreateAppUserOrderResponse {
  Info: Order;
}


export interface UpdateAppUserOrderRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  ID: string
  PaymentID: string
  Canceled: boolean
}

export interface UpdateAppUserOrderResponse {
  Info: Order;
}
