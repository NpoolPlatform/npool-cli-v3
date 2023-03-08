import { BenefitType, GoodType, SettleType } from './const';


export interface Good {
  ID: string;
  DeviceInfoID: string;
  DeviceType: string;
  DeviceManufacturer: string;
  DevicePowerComsuption: number;
  DeviceShipmentAt: number;
  DevicePosters: string[];
  DurationDays: number;
  CoinTypeID: string;
  CoinLogo: string;
  CoinName: string;
  CoinUnit: string;
  CoinPreSale: boolean;
  CoinEnv: string;
  CoinSpecs: string;
  CoinHomePage: string;
  InheritFromGoodID: string;
  InheritFromGoodName: string;
  InheritFromGoodType: GoodType;
  InheritFromGoodBenefitType: BenefitType;
  VendorLocationID: string;
  VendorLocationCountry: string;
  VendorLocationProvince: string;
  VendorLocationCity: string;
  VendorLocationAddress: string;
  GoodType: GoodType;
  BenefitType: BenefitType;
  ProductPage: string;
  Price: string;
  Title: string;
  Unit: string;
  UnitAmount: number;
  TestOnly: boolean;
  Posters: string[];
  Labels: string[];
  VoteCount: number;
  Rating: number;
  SupportCoins: GoodCoinInfo[];
  SupportCoinTypeIDs: string[];
  GoodStockID: string;
  Total: string;
  Locked: string;
  InService: string;
  WaitStart: string;
  Sold: string;
  DeliveryAt: number;
  StartAt: number;
  CreatedAt: number;
  UpdatedAt: number;
  DeletedAt: number;
  EnablePurchase: boolean;
  EnableProductPage: boolean;
  EnableSetCommission: boolean;
  UserPurchaseLimit: string;
  CancelMode: CancelMode;
  CancellableBeforeStart: number;
}

export interface GoodCoinInfo {
  CoinTypeID: string;
  CoinLogo: string;
  CoinName: string;
  CoinUnit: string;
  CoinPreSale: boolean;
}

export enum CancelMode {
  DefaultCancelMode = 'DefaultCancelMode',
  CancellableBeforeStart = 'CancellableBeforeStart',
  CancellableBeforeBenefit = 'CancellableBeforeBenefit',
  UnCancellable = 'Uncancellable'
}

export const CancelModes = [
  CancelMode.CancellableBeforeBenefit,
  CancelMode.CancellableBeforeStart,
  CancelMode.UnCancellable
]

export interface AppGood {
  ID: string;
  AppID: string;
  GoodID: string;
  Online: boolean;
  Visible: boolean;
  Price: string;
  DisplayIndex: number;
  PurchaseLimit: number;
  Commission: boolean;
  CommissionSettleType: SettleType;
  CommissionPercent: number;
  BenefitIntervalHours: number;
  PromotionStartAt: number;
  PromotionEndAt: number;
  PromotionMessage: string;
  PromotionPrice: string;
  PromotionPosters: string[];
  RecommenderID: string;
  RecommenderEmailAddress: string;
  RecommenderPhoneNO: string;
  RecommenderUsername: string;
  RecommenderFirstName: string;
  RecommenderLastName: string;
  RecommendMessage: string;
  RecommendIndex: number;
  RecommendAt: number;
  DeviceType: string;
  DeviceManufacturer: string;
  DevicePowerComsuption: number;
  DeviceShipmentAt: number;
  DevicePosters: string[];
  DurationDays: number;
  VendorLocationCountry: string;
  CoinTypeID: string;
  CoinLogo: string;
  GoodBanner: string;
  CoinName: string;
  CoinUnit: string;
  CoinPreSale: boolean;
  CoinEnv: string;
  CoinSpecs: string;
  CoinHomePage: string;
  GoodType: GoodType;
  BenefitType: BenefitType;
  GoodName: string;
  ProductPage: string;
  Unit: string;
  UnitAmount: number;
  TestOnly: boolean;
  Posters: string[];
  Labels: string[];
  VoteCount: number;
  Rating: number;
  SupportCoins: GoodCoinInfo[];
  Total: string;
  Locked: string;
  InService: string;
  WaitStart: string;
  Sold: string;
  SubGoods: Good[];
  Must: boolean;
  StartAt: number;
  CreatedAt: number;
  SaleStartAt: number;
  SaleEndAt: number;
  ServiceStartAt: number;
  TechnicalFeeRatio: number;
  ElectricityFeeRatio: number;
  DailyRewardAmount: string;
  Descriptions: string[];
  DisplayNames: string[];
  DisplayColors: string[];
  EnablePurchase: boolean;
  EnableProductPage: boolean;
  EnableSetCommission: boolean;
  UserPurchaseLimit: string;
  CancelMode: CancelMode;
  CancellableBeforeStart: number;
}

export interface DeviceInfo {
  ID: string;
  Type: string;
  Manufacturer: string;
  PowerComsuption: number;
  ShipmentAt: number;
  Posters: string[];
  CreatedAt: number;
  UpdatedAt: number;
  DeletedAt: number;
}

export interface VendorLocation {
  ID: string;
  Country: string;
  Province: string;
  City: string;
  Address: string;
  CreatedAt: number;
  UpdatedAt: number;
  DeletedAt: number;
}

export interface Promotion {
  ID: string;
  AppID: string;
  GoodID: string;
  GoodName: string;
  Message: string;
  StartAt: number;
  EndAt: number;
  Price: string;
  Posters: string[];
  CreatedAt: number;
  UpdatedAt: number;
}

export interface Recommend {
  ID: string;
  AppID: string;
  GoodID: string;
  GoodName: string;
  RecommenderID: string;
  RecommenderUsername: string;
  RecommenderFirstName: string;
  RecommenderLastName: string;
  RecommenderEmailAddress: string;
  RecommenderPhoneNo: string;
  Message: string;
  RecommendIndex: number;
  CreatedAt: number;
  UpdatedAt: number;
}

export interface AppDefaultGood {
  ID: string;
  AppID: string;
  GoodID: string;
  CoinTypeID: string;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}