enum API {
  CREATE_EVENT_COUPON = '/cloud-hashing-inspire/v1/create/event/coupon',
  UPDATE_EVENT_COUPON = '/cloud-hashing-inspire/v1/update/event/coupon',
  GET_EVENT_COUPONS = '/cloud-hashing-inspire/v1/get/event/coupons/by/app'
}

enum CouponEvent {
  EventSharing                 = 'sharing',
  EventInvitationRegisteration = 'invitation-registeration',
  EventInvitationPurchase      = 'invitation-purchase',
  EventRegister                = 'register',
  EventKYCAuthenticate         = 'kyc-authenticate',
  EventTotalAmount             = 'total-amount',
  EventSingleAmount            = 'single-amount'
}

const CouponEvents = [
  CouponEvent.EventSharing,
  CouponEvent.EventInvitationRegisteration,
  CouponEvent.EventInvitationPurchase,
  CouponEvent.EventRegister,
  CouponEvent.EventKYCAuthenticate,
  CouponEvent.EventTotalAmount,
  CouponEvent.EventSingleAmount
]

export {
  API,
  CouponEvent,
  CouponEvents
}
