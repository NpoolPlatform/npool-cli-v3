import { Order, BaseRequest, OrderType } from '../../../base'

interface GetAppOrdersRequest extends BaseRequest {
  Offset?: number;
  Limit?: number;
}

interface GetAppOrdersResponse {
  Infos: Array<Order>;
  Total: number;
}

interface CreateUserOrderRequest extends BaseRequest {
  TargetUserID: string;
  GoodID: string;
  Units: number;
  PaymentCoinID: string;
  ParentOrderID?: string;
  PayWithBalanceAmount?: string;
  FixAmountID?: string;
  DiscountID?: string;
  SpecialOfferID?: string;
  OrderType?: OrderType;
}

interface CreateUserOrderResponse {
  Info: Order;
}


interface UpdateUserOrderRequest extends BaseRequest {
  TargetUserID: string
  ID: string
  PaymentID: string
  Canceled: boolean
}

interface UpdateUserOrderResponse {
  Info: Order;
}


export {
  GetAppOrdersRequest,
  GetAppOrdersResponse,
  CreateUserOrderRequest,
  CreateUserOrderResponse,
  UpdateUserOrderRequest,
  UpdateUserOrderResponse
}
