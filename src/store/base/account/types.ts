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

export interface Account {
  ID: string;
  AppID: string;
  UserID: string;
  CoinTypeID: string;
  CoinName: string;
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