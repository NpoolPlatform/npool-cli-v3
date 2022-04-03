import { UserInfo } from '../users/types'

interface LoginedResponse {
  Info: UserInfo
}

interface LoginedUserState {
  LoginedUser?: UserInfo
}

export {
  LoginedUserState,
  LoginedResponse
}
