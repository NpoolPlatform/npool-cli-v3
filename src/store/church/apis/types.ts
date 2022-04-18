import { BaseRequest } from "../../base"

interface APIBase {
  ID: string
  ServiceName: string
  Method: string
  Path: string
  Exported: boolean
  PathPrefix: string
  Protocol: string
  CreateAt: number
  UpdateAt: number
}

interface API extends APIBase {
  Domains: Array<string>
}

interface ExpandAPI extends APIBase {
  Domains: string
}

interface GetAPIsRequest extends BaseRequest {
}

interface GetAPIsResponse {
  Infos: Array<API>
}

interface APIState {
  APIs: Array<API>
}

export {
  API,
  ExpandAPI,
  GetAPIsRequest,
  GetAPIsResponse,
  APIState
}