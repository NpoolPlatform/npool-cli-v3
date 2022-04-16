enum API {
  SIGNUP = '/cloud-hashing-apis-v2/v1/signup',
  LOGIN = '/login-gateway/v1/login',
  LOGOUT = '/login-gateway/v1/logout',
  LOGINED = '/login-gateway/v1/logined',
  UPDATE_PASSWORD = '/cloud-hashing-apis-v2/v1/update/password/by/app/user',
  RESET_PASSWORD = '/cloud-hashing-apis-v2/v1/update/password',
  GET_LOGIN_HISTORIES = '/login-gateway/v1/get/login/histories',
  SETUP_GOOGLE_AUTHENTICATION = '/third-gateway/v1/setup/google/authentication',
  UPDATE_ACCOUNT = '/cloud-hashing-apis-v2/v1/update/account',
  CREATE_EXTRA = '/cloud-hashing-apis-v2/v1/create/app/user/extra',
  UPDATE_EXTRA = '/cloud-hashing-apis-v2/v1/update/app/user/extra',
  UPDATE_CONTROL = '/cloud-hashing-apis-v2/v1/update/app/user/control',
  CREATE_CONTROL = '/cloud-hashing-apis-v2/v1/create/app/user/control',
  UPDATE_EMAIL = '/cloud-hashing-apis-v2/v1/update/emailaddress',
  UPDATE_PHONE = '/cloud-hashing-apis-v2/v1/update/phoneno'
}

export {
  API
}
