import { Order } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetAppOrdersRequest extends BaseRequest {
}

interface GetAppOrdersResponse {
  Infos: Array<Order>
}

export {
  GetAppOrdersRequest,
  GetAppOrdersResponse
}
