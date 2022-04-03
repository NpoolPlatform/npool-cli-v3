const NotSet = 'NOT SET'

enum AccountType {
  Mobile = 'mobile',
  Email = 'email',
  Google = 'google'
}

const VerificationCodeLength = 6
const MinPasswordLength = 8
const MaxPasswordLength = 32

const InvalidID = '00000000-0000-0000-0000-000000000000'

export {
  NotSet,
  AccountType,
  VerificationCodeLength,
  MinPasswordLength,
  MaxPasswordLength,
  InvalidID
}
