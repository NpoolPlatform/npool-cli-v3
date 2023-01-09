export enum BenefitType {
  DefaultBenefitType = 'DefaultBenefitType',
  BenefitTypePlatform = 'BenefitTypePlatform',
  BenefitTypePool = 'BenefitTypePool',
}

export const BenefitTypes = [
  BenefitType.BenefitTypePlatform,
  BenefitType.BenefitTypePool
]

export enum GoodType {
  DefaultGoodType = 'DefaultGoodType',
  GoodTypeClassicMining = 'GoodTypeClassicMining',
  GoodTypeUnionMining = 'GoodTypeUnionMining',
  GoodTypeTechniqueFee = 'GoodTypeTechniqueFee',
  GoodTypeElectricityFee = 'GoodTypeElectricityFee',
}
export const GoodTypes = [
  GoodType.GoodTypeClassicMining,
  GoodType.GoodTypeUnionMining,
  GoodType.GoodTypeTechniqueFee,
  GoodType.GoodTypeElectricityFee
]

/** @default "DefaultSettleInterval" */
export enum SettleInterval {
  DefaultSettleInterval = 'DefaultSettleInterval',
  SettleAggregate = 'SettleAggregate',
  SettleMonthly = 'SettleMonthly',
  SettleYearly = 'SettleYearly',
  SettleEveryOrder = 'SettleEveryOrder',
}

/** @default "DefaultSettleMode" */
export enum SettleMode {
  DefaultSettleMode = 'DefaultSettleMode',
  SettleWithGoodValue = 'SettleWithGoodValue',
  SettleWithPaymentAmount = 'SettleWithPaymentAmount',
}

/** @default "DefaultSettleType" */
export enum SettleType {
  DefaultSettleType = 'DefaultSettleType',
  GoodOrderPercent = 'GoodOrderPercent',
  LimitedOrderPercent = 'LimitedOrderPercent',
  AmountThreshold = 'AmountThreshold',
  NoCommission = 'NoCommission',
}

export const SettleTypes = [
  SettleType.GoodOrderPercent,
  SettleType.LimitedOrderPercent,
  SettleType.AmountThreshold,
  SettleType.NoCommission
]