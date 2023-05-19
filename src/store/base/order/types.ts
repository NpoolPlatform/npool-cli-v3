import { OrderState } from './const';

export interface Order {
  ID: string;
  ParentOrderID: string;
  ParentOrderGoodID: string;
  ParentOrderGoodName: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  CoinPresale: boolean;
  GoodID: string;
  GoodName: string;
  GoodUnit: string;
  GoodServicePeriodDays: number;
  GoodUnitPrice: string;
  GoodValue: string;
  Units: string;
  PaymentID: string;
  PaymentCoinTypeID: string;
  PaymentCoinName: string;
  PaymentCoinLogo: string;
  PaymentCoinUnit: string;
  PaymentCoinUSDCurrency: string;
  PaymentLiveUSDCurrency: string;
  PaymentLocalUSDCurrency: string;
  PaymentAddress: string;
  PaymentAmount: string;
  PaymentStartAmount: string;
  PaymentFinishAmount: string;
  PayWithBalanceAmount: string;
  PayWithParent: boolean;
  FixAmountID: string;
  FixAmountName: string;
  FixAmountAmount: string;
  DiscountID: string;
  DiscountName: string;
  DiscountPercent: number;
  SpecialOfferID: string;
  SpecialOfferAmount: string;
  CreatedAt: number;
  PaidAt: number;
  State: OrderState;
  OrderType: string;
  Start: number;
  End: number;
}