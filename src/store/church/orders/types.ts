import { Order } from '../../frontend'
import { BaseRequest } from '../../base'
import { GetAppBaseOrdersRequest, GetAppBaseOrdersResponse, SubmitUserOrderRequest, SubmitUserOrderResponse } from '../../admin'

interface GetTargetAppOrdersRequest extends BaseRequest {
  TargetAppID: string
}

interface GetTargetAppOrdersResponse {
  Infos: Array<Order>
}

interface GetTargetAppBaseOrdersRequest extends GetAppBaseOrdersRequest {
  TargetAppID: string
}

interface GetTargetAppBaseOrdersResponse extends GetAppBaseOrdersResponse {
}

interface SubmitAppUserOrderRequest extends SubmitUserOrderRequest {
  TargetAppID: string
}

interface SubmitAppUserOrderResponse extends SubmitUserOrderResponse {
}

export {
  GetTargetAppOrdersRequest,
  GetTargetAppOrdersResponse,
  GetTargetAppBaseOrdersRequest,
  GetTargetAppBaseOrdersResponse,
  SubmitAppUserOrderRequest,
  SubmitAppUserOrderResponse
}
