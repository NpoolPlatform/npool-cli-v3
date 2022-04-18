import { BaseRequest } from "../../base"

interface AppAuth {
  ID?: string
  AppID: string
  Resource: string
  Method: string
}

interface AppUserAuth extends AppAuth {
  UserID: string
}

interface AppRoleAuth extends AppAuth {
  RoleID: string
}

interface Auth extends AppUserAuth {
  RoleID: string
}

interface GetAuthsRequest extends BaseRequest {
  TargetAppID: string
}

interface GetAuthsResponse {
  Infos: Array<Auth>
}

interface CreateAppAuthRequest extends BaseRequest {
  TargetAppID: string
  Info: AppAuth
}

interface CreateAppAuthResponse {
  Info: Auth
}

interface CreateAppUserAuthRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  Info: AppUserAuth
}

interface CreateAppUserAuthResponse {
  Info: Auth
}

interface CreateAppRoleAuthRequest extends BaseRequest {
  TargetAppID: string
  Info: AppRoleAuth
}

interface CreateAppRoleAuthResponse {
  Info: Auth
}

interface DeleteAppAuthRequest extends BaseRequest {
  ID: string
}

interface DeleteAppAuthResponse {
  Info: Auth
}

interface DeleteAppUserAuthRequest extends BaseRequest {
  ID: string
}

interface DeleteAppUserAuthResponse {
  Info: Auth
}

interface DeleteAppRoleAuthRequest extends BaseRequest {
  ID: string
}

interface DeleteAppRoleAuthResponse {
  Info: Auth
}

interface AuthHistory {
  ID: string
  AppID: string
  UserID: string
  Resource: string
  Method: string
  Allowed: boolean
  CreateAt: number
}

interface GetAuthHistoriesRequest extends BaseRequest {
  TargetAppID: string
}

interface GetAuthHistoriesResponse {
  Infos: Array<AuthHistory>
}

interface AuthState {
  AppAuths: Map<string, Array<Auth>>
  UserAuths: Map<string, Array<Auth>>
  RoleAuths: Map<string, Array<Auth>>
  Histories: Array<AuthHistory>
}

export {
  AppAuth,
  AppUserAuth,
  AppRoleAuth,
  Auth,
  GetAuthsRequest,
  GetAuthsResponse,
  CreateAppAuthRequest,
  CreateAppAuthResponse,
  CreateAppUserAuthRequest,
  CreateAppUserAuthResponse,
  CreateAppRoleAuthRequest,
  CreateAppRoleAuthResponse,
  DeleteAppAuthRequest,
  DeleteAppAuthResponse,
  DeleteAppUserAuthRequest,
  DeleteAppUserAuthResponse,
  DeleteAppRoleAuthRequest,
  DeleteAppRoleAuthResponse,
  AuthHistory,
  GetAuthHistoriesRequest,
  GetAuthHistoriesResponse,
  AuthState
}