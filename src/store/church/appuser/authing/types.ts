import { Auth, AuthHistory } from '../../../base/appuser'
import { BaseRequest } from '../../../base/notify'

export interface GetAppAuthsRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppAuthsResponse {
  Infos: Array<Auth>
}

export interface CreateAppAuthRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID?: string
  RoleID?: string
  Resource: string
  Method: string
}

export interface CreateAppAuthResponse {
  Info: Auth
}

export interface DeleteAppAuthRequest extends BaseRequest {
  TargetAppID: string
  ID: string
}

export interface DeleteAppAuthResponse {
  Info: Auth
}

export interface GetAppAuthHistoriesRequest extends BaseRequest {
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppAuthHistoriesResponse {
  Infos: Array<AuthHistory>
}

export interface ChurchAuthingState {
  Auths: Map<string, Array<Auth>>
  Histories: Map<string, Array<AuthHistory>>
}
