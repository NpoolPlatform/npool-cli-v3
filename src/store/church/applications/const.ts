enum API {
  GET_APPLICATIONS = '/appuser-manager/v1/get/appinfos',

  UPDATE_APP_CONTROL = '/appuser-manager/v1/update/app/control',
  CREATE_APP_CONTROL = '/appuser-manager/v1/create/app/control/for/other/app',

  CREATE_APPLICATION = '/appuser-manager/v1/create/app',
  UPDATE_APPLICATION = '/appuser-manager/v1/update/app'
}

enum RecaptchaMethod {
  GoogleRecaptchaV3 = 'google-recaptcha-v3'
}

const RecaptchaMethods = [
  RecaptchaMethod.GoogleRecaptchaV3
]

export {
  API,
  RecaptchaMethod,
  RecaptchaMethods
}
