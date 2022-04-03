enum ImageType {
  Front = 'front',
  Back = 'back',
  Handing = 'handing'
}

enum API {
  UPLOAD_IMAGE = '/kyc-management/v1/upload/kyc/image',
  CREATE_KYC = '/cloud-hashing-apis-v2/v1/create/kyc',
  UPDATE_KYC = '/cloud-hashing-apis-v2/v1/update/kyc',
  GET_KYC = '/cloud-hashing-apis-v2/v1/get/kyc/by/app/user',
  GET_KYC_IMAGE = '/kyc-management/v1/get/kyc/image',
}

enum State {
  NotVerified = 'not-verified',
  Wait = 'wait',
  Verified = 'approved',
  Rejected = 'rejected'
}

enum DocumentType {
  IDCard = 'id-card',
  Passport = 'passport'
}

export {
  ImageType,
  State,
  DocumentType,
  API
}
