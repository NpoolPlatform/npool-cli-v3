import { GetBaseOrdersRequest, GetBaseOrdersResponse, Order } from '../../frontend'
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

export {
  GetAppOrdersRequest,
  GetAppOrdersResponse,
  GetAppBaseOrdersRequest,
  GetAppBaseOrdersResponse
}
