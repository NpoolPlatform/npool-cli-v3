export interface GoodArchivement {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  GoodID: string;
  GoodName: string;
  GoodUnit: string;
  CommissionPercent: number;
  TotalUnits: number;
  SelfUnits: number;
  TotalAmount: string;
  SelfAmount: string;
  TotalCommission: string;
  SelfCommission: string;
  SuperiorCommission: string;
}

export interface UserArchivement {
  UserID: string;
  InviterID: string;
  Username: string;
  EmailAddress: string;
  PhoneNO: string;
  FirstName: string;
  LastName: string;
  CreatedAt: number;
  InvitedAt: number;
  Kol: boolean;
  TotalInvitees: number;
  Archivements: Array<GoodArchivement>;
}
