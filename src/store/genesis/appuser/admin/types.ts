import { App, Auth, BaseRequest, Role, User } from '../../../base';

export interface CreateAdminAppsRequest extends BaseRequest {
}

export interface CreateAdminAppsResponse {
  Infos: Array<App>
}

export interface GetAdminAppsRequest extends BaseRequest {
}

export interface GetAdminAppsResponse {
  Infos: Array<App>
}

export interface CreateGenesisRolesRequest extends BaseRequest {
}

export interface CreateGenesisRolesResponse {
  Infos: Array<Role>
}

export interface GetGenesisRolesRequest extends BaseRequest {
}

export interface GetGenesisRolesResponse {
  Infos: Array<Role>
}

export interface CreateGenesisUserRequest extends BaseRequest {
  TargetAppID: string
  EmailAddress: string
  PasswordHash: string
}

export interface CreateGenesisUserResponse {
  Info: User
}

export interface GetGenesisUsersRequest extends BaseRequest {
}

export interface GetGenesisUsersResponse {
  Infos: Array<User>
}

export interface AuthorizeGenesisRequest extends BaseRequest {
}

export interface AuthorizeGenesisResponse {
  Infos: Array<Auth>
}

export interface GetGenesisAuthsRequest extends BaseRequest {
  TargetAppID: string
}

export interface GetGenesisAuthsResponse {
  Infos: Array<Auth>
}

