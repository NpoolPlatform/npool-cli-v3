import { Order, BaseRequest } from '../../../base'

export interface GetOrdersRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetOrdersResponse {
  Infos: Array<Order>;
  Total: number;
}

export interface CreateOrderRequest extends BaseRequest {
  GoodID: string;
  Units: number;
  PaymentCoinID: string;
  ParentOrderID?: string;
  PayWithBalanceAmount?: string;
  FixAmountID?: string;
  DiscountID?: string;
  SpecialOfferID?: string;
  OrderType?: string;
}

export interface CreateOrderResponse {
  Info: Order;
}

export interface UpdateOrderRequest extends BaseRequest {
  ID: string;
  PaymentID: string;
  Canceled: boolean;
}

export interface UpdateOrderResponse {
  Info: Order;
}

export interface GetOrderRequest extends BaseRequest {
  ID: string;
}

export interface GetOrderResponse {
  Info: Order;
}