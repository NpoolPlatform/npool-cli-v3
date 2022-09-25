export enum SigninVerifyType {
  Mobile = 'Mobile',
  Email = 'Email',
  Google = 'Google'
}

export enum SignMethodType {
  Mobile = 'Mobile',
  Email = 'Email',
  Twitter = 'Twitter',
  Github = 'Github',
  Facebook = 'Facebook',
  Linkedin = 'Linkedin',
  Wechat = 'Wechat',
  Google = 'Google',
  Username = 'Username'
}

export const SignMethodTypes = [
  SignMethodType.Mobile,
  SignMethodType.Email,
  SignMethodType.Twitter,
  SignMethodType.Github,
  SignMethodType.Facebook,
  SignMethodType.Linkedin,
  SignMethodType.Wechat,
  SignMethodType.Google,
  SignMethodType.Username,
]

export enum RecaptchaType {
  GoogleRecaptchaV3 = 'GoogleRecaptchaV3'
}

export enum AccountType {
  Mobile = 'Mobile',
  Email = 'Email',
  Twitter = 'Twitter',
  Github = 'Github',
  Facebook = 'Facebook',
  Linkedin = 'Linkedin',
  Wechat = 'Wechat',
  Google = 'Google',
  Username = 'Username'
}

/**KYC**/
export enum DocumentType {
  DefaultKycDocumentType = 'DefaultKycDocumentType',
  IDCard = 'IDCard',
  DriverLicense ='DriverLicense',
  Passport = 'Passport'
}

export enum EntityType {
  DefaultKycEntityType = 'DefaultKycEntityType',
  Individual = 'Individual',
  Organization = 'Organization'
}

export enum KYCState {
  DefaultState = 'DefaultState',
  Approved = 'Approved',
  Reviewing = 'Reviewing',
  Rejected = 'Rejected'
}

export enum ImageType {
  DefaultKycImageType = 'DefaultKycImageType',
  FrontImg = 'FrontImg',
  BackImg = 'BackImg',
  SelfieImg = 'SelfieImg'
}

export enum KYCReviewState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'Approved',
  Wait ='Wait',
  Rejected = 'Rejected'
}