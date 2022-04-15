import { KYCInfo } from '../../frontend'
import { BaseRequest } from "../../base"

interface GetKYCsRequest extends BaseRequest {
}

interface GetKYCsResponse {
  Infos: Array<KYCInfo>
}

export {
  GetKYCsRequest,
  GetKYCsResponse
}
