enum API {
  SEND_EMAIL_CODE = '/third-gateway/v1/send/email/code',
  SEND_SMS_CODE = '/third-gateway/v1/send/sms/code'
}

const GoogleRecaptchaKey = '6Lcg4yIeAAAAANIyLz_mbENlYRSkK1C_aQkejb_4'

enum GoogleTokenType {
  Login = 'login'
}

enum MessageUsedFor {
  Signup = 'SIGNUP',
  Update = 'UPDATE',
  SetWithdrawAddress = 'SETWITHDRAWADDRESS'
}

export {
  API,
  GoogleRecaptchaKey,
  GoogleTokenType,
  MessageUsedFor
}
