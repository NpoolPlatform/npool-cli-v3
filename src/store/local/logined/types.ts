interface UserInfo {

}
interface LoginedResponse {
  Info: UserInfo;
}

interface LoginedUserState {
  LoginedUser?: UserInfo;
}

export {
  LoginedUserState,
  LoginedResponse
}
