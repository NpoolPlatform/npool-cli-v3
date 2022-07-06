import { GetBaseOrdersRequest, GetBaseOrdersResponse, Order, SubmitOrderRequest, SubmitOrderResponse } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetAppOrdersRequest extends BaseRequest {
}

interface GetAppOrdersResponse {
  Infos: Array<Order>
}

interface GetAppBaseOrdersRequest extends GetBaseOrdersRequest {
}

interface GetAppBaseOrdersResponse extends GetBaseOrdersResponse {
}

interface SubmitUserOrderRequest extends SubmitOrderRequest {
  TargetUserID: string
}

interface SubmitUserOrderResponse extends SubmitOrderResponse {
}

export {
  GetAppOrdersRequest,
  GetAppOrdersResponse,
  GetAppBaseOrdersRequest,
  GetAppBaseOrdersResponse,
  SubmitUserOrderRequest,
  SubmitUserOrderResponse
}
