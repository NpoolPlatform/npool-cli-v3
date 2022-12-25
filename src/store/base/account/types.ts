export interface TransferAccount {
  ID:                 string;
  AppID:              string;
  UserID:             string;
  TargetUserID:       string;
  TargetEmailAddress: string;
  TargetPhoneNO:      string;
  CreatedAt:          number;
  TargetUsername:     string;
  TargetFirstName:    string;
  TargetLastName:     string;
}
export interface Transfer {
  CoinTypeID:         string;
  CoinName:           string;
  CoinDisplayNames:   string[];
  CoinLogo:           string;
  CoinUnit:           string;
  Amount:             string;
  CreatedAt:          number;
  TargetUserID:       string;
  TargetEmailAddress: string;
  TargetPhoneNO:      string;
  TargetUsername:     string;
  TargetFirstName:    string;
  TargetLastName:     string;
}

export enum AccountUsedFor {
  DefaultAccountUsedFor = "DefaultAccountUsedFor",
  GoodBenefit = "GoodBenefit",
  UserBenefitHot = "UserBenefitHot",
  UserBenefitCold = "UserBenefitCold",
  PlatformBenefitCold = "PlatformBenefitCold",
  GasProvider = "GasProvider",
  UserWithdraw = "UserWithdraw",
  UserDeposit = "UserDeposit",
  GoodPayment = "GoodPayment",
  PaymentCollector = "PaymentCollector",
  UserDirectBenefit = "UserDirectBenefit",
}

export const AccountUsedFors =  [
  AccountUsedFor.GoodBenefit,
  AccountUsedFor.UserBenefitHot,
  AccountUsedFor.UserBenefitCold,
  AccountUsedFor.PlatformBenefitCold,
  AccountUsedFor.GasProvider,
  AccountUsedFor.UserWithdraw,
  AccountUsedFor.UserDeposit,
  AccountUsedFor.GoodPayment,
  AccountUsedFor.PaymentCollector,
  AccountUsedFor.UserDirectBenefit,
]

export interface Account {
  ID: string;
  AppID: string;
  UserID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinDisplayNames: string[];
  CoinUnit: string;
  CoinEnv: string;
  CoinLogo: string;
  AccountID: string;
  Address: string;
  /** Only [UserWithdraw, UserDirectBenefit, UserDeposit] */
  UsedFor: AccountUsedFor;
  Labels: string[];
  CreatedAt: number;
  PhoneNO: string;
  EmailAddress: string;
  Active: boolean;
  Blocked: boolean;
}

export interface Address {
  ID: string;
  CoinTypeID: string;
  AccountID: string;
  Name: string;
  Message: string;
  CreateAt: number;
  Labels: string[];
  DeleteAt: number;
}

export interface WithdrawAccount {
  ID: string;
  CoinTypeID: string;
  Address: string;
  CreateAt: number;
  PlatformHoldPrivateKey: boolean;
}

export interface WithdrawAddress {
  Address: Address;
  State: string;
  Message: string;
  Account: WithdrawAccount;
}

export enum LockedBy {
  DefaultLockedBy = "DefaultLockedBy",
  Payment = "Payment",
  Collecting = "Collecting",
}

export interface PaymentAccount {
  ID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinDisplayNames: string[];
  CoinUnit: string;
  CoinEnv: string;
  CoinLogo: string;
  AccountID: string;
  Address: string;
  CollectingTID: string;
  Active: boolean;
  Locked: boolean;
  LockedBy: LockedBy;
  Blocked: boolean;
  CreatedAt: number;
  AvailableAt: number;
  UpdatedAt: number;
}

export interface GoodBenefitAccount {
  ID: string;
  GoodID: string;
  GoodName: string;
  GoodUnit: string;
  CoinTypeID: string;
  CoinName: string;
  CoinDisplayNames: string[];
  CoinUnit: string;
  CoinEnv: string;
  CoinLogo: string;
  AccountID: string;
  Backup: true;
  Address: string;
  Active: boolean;
  Locked: boolean;
  LockedBy: LockedBy;
  Blocked: boolean;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface PlatformAccount {
  ID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinDisplayNames: string[];
  CoinUnit: string;
  CoinEnv: string;
  CoinLogo: string;
  UsedFor: AccountUsedFor;
  AccountID: string;
  Address: string;
  Backup: true;
  Active: boolean;
  Locked: boolean;
  LockedBy: LockedBy;
  Blocked: boolean;
  CreatedAt: number;
}