/** @default "DefaultEventType" */
export enum EventType {
  DefaultEventType = 'DefaultEventType',
  WithdrawalRequest = 'WithdrawalRequest',
  WithdrawalCompleted = 'WithdrawalCompleted',
  DepositReceived = 'DepositReceived',
  KYCApproved = 'KYCApproved',
  KYCRejected = 'KYCRejected',
}

export const EventTypes = [
  EventType.WithdrawalRequest,
  EventType.WithdrawalCompleted,
  EventType.DepositReceived,
  EventType.KYCApproved,
  EventType.KYCRejected
]

/** @default "DefaultChannel" */
export enum NotifChannel {
  DefaultChannel = 'DefaultChannel',
  ChannelEmail = 'ChannelEmail',
  ChannelSMS = 'ChannelSMS',
  ChannelFrontend = 'ChannelFrontend'
}

export const NotifChannels = [
  NotifChannel.ChannelEmail,
  NotifChannel.ChannelSMS,
  NotifChannel.ChannelFrontend
]

export enum AnnouncementType {
  DefaultAnnouncementType = 'DefaultAnnouncementType',
  AllUsers = 'AllUsers',
  AppointUsers = 'AppointUsers',
}

export const AnnouncementTypes = [
  AnnouncementType.AllUsers,
  AnnouncementType.AppointUsers
]
