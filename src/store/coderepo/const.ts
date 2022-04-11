enum API {
  SEND_EMAIL_CODE = '/third-gateway/v1/send/email/code',
  SEND_SMS_CODE = '/third-gateway/v1/send/sms/code',
  VERIFY_GOOGLE_AUTHENTICATION = '/third-gateway/v1/verify/google/authentication'

}

enum MessageUsedFor {
  Signup = 'SIGNUP',
  Update = 'UPDATE',
  SetWithdrawAddress = 'SETWITHDRAWADDRESS',
  Singin = 'SIGNIN'
}

export {
  API,
  MessageUsedFor
}
