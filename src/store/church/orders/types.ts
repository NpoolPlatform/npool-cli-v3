import { Order } from '../../frontend'
import { BaseRequest } from '../../base'
import { GetAppBaseOrdersRequest, GetAppBaseOrdersResponse } from '../../admin'

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

export {
  GetTargetAppOrdersRequest,
  GetTargetAppOrdersResponse,
  GetTargetAppBaseOrdersRequest,
  GetTargetAppBaseOrdersResponse
}
