import { UserInfo } from '../../frontend/users/types'

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
