import { KYC } from '../../frontend'
import { BaseRequest } from "../../base"

interface GetKYCsRequest extends BaseRequest {
}

interface GetKYCsResponse {
  Infos: Array<KYC>
}

export {
  GetKYCsRequest,
  GetKYCsResponse
}
