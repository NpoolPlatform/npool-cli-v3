import { AppUser, AppUserExtra, UserInfo } from '../../frontend'
import { BaseRequest } from '../../base'

interface AppUserSecret {
  ID?: string
  AppID: string
  UserID: string
  PasswordHash: string
  Salt: string
  GoogleSecret: string
}

interface CreateUserRequest extends BaseRequest {
  Info: AppUser
}

interface CreateUserResponse {
  Info: AppUser
}

interface UpdateUserRequest {
  Info: AppUser
}

interface UpdateUserResponse {
  Info: AppUser
}

interface CreateSecretRequest extends BaseRequest {
  TargetUserID: string
  Info: AppUserSecret
}

interface CreateSecretResponse {
  Info: AppUserSecret
}

interface UpdateSecretRequest {
  Info: AppUserSecret
}

interface UpdateSecretResponse {
  Info: AppUserSecret
}

interface CreateExtraRequest extends BaseRequest {
  TargetUserID: string
  Info: AppUserExtra
}

interface CreateExtraResponse {
  Info: AppUserExtra
}

interface UpdateExtraRequest extends BaseRequest {
  Info: AppUserExtra
}

interface UpdateExtraResponse {
  Info: AppUserExtra
}

interface GetUsersRequest extends BaseRequest {
}

interface GetUsersResponse {
  Infos: Array<UserInfo>
}

export {
  AppUserSecret,
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  CreateExtraRequest,
  CreateExtraResponse,
  UpdateExtraRequest,
  UpdateExtraResponse,
  CreateSecretRequest,
  CreateSecretResponse,
  UpdateSecretRequest,
  UpdateSecretResponse,
  GetUsersRequest,
  GetUsersResponse
}
