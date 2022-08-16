export enum WithdrawState {
  DefaultWithdrawState = 'DefaultWithdrawState',
  Reviewing = 'Reviewing',
  Transferring = 'Transferring',
  Rejected = 'Rejected',
  TransactionFail = 'TransactionFail',
  Successful = 'Successful',
}

export enum AccountType {
  DEFAULT_SIGN_METHOD_TYPE = 'DefaultSignMethodType',
  MOBILE = 'Mobile',
  EMAIL = 'Email',
  TWITTER = 'Twitter',
  GITHUB = 'Github',
  FACEBOOK = 'Facebook',
  LINKEDIN = 'Linkedin',
  WECHAT = 'Wechat',
  GOOGLE = 'Google',
}