enum API {
  SIGNUP = '/cloud-hashing-apis-v2/v1/signup',
  LOGIN = '/login-gateway/v1/login',
  LOGINED = '/login-gateway/v1/logined', // This is the same as in logined module
  UPDATE_PASSWORD = '/cloud-hashing-apis-v2/v1/update/password/by/app/user',
  RESET_PASSWORD = '/cloud-hashing-apis-v2/v1/update/password',
  GET_LOGIN_HISTORIES = '/login-gateway/v1/get/login/histories',
  SETUP_GOOGLE_AUTHENTICATION = '/third-gateway/v1/setup/google/authentication',
  UPDATE_ACCOUNT = '/cloud-hashing-apis-v2/v1/update/account',
  CREATE_EXTRA = '/cloud-hashing-apis-v2/v1/create/app/user/extra',
  UPDATE_EXTRA = '/cloud-hashing-apis-v2/v1/update/app/user/extra',
  UPDATE_CONTROL = '/appuser-manager/v1/update/app/user/control',
  CREATE_CONTROL = '/appuser-manager/v1/create/app/user/control'
}

export {
  API
}
