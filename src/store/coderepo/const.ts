enum API {
  SEND_EMAIL_CODE = '/third-gateway/v1/send/email/code',
  SEND_SMS_CODE = '/third-gateway/v1/send/sms/code'
}

enum MessageUsedFor {
  Signup = 'SIGNUP',
  Update = 'UPDATE',
  SetWithdrawAddress = 'SETWITHDRAWADDRESS'
}

export {
  API,
  MessageUsedFor
}
