import { BaseRequest } from 'src/store/base'

interface Archivement {
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

interface GoodArchivement {
  UserID: string;
  Username: string;
  EmailAddress: string;
  PhoneNO: string;
  FirstName: string;
  LastName: string;
  CreatedAt: number;
  InvitedAt: number;
  Kol: boolean;
  TotalInvitees: number;
  Archivements: Array<Archivement>;
}

interface GetGoodArchivementsRequest extends BaseRequest {
  Offset?: number;
  Limit?: number;
}
interface GetGoodArchivementsResponse {
  Archivements: GoodArchivement[];
  Total: number;
}

export {
  Archivement,
  GetGoodArchivementsRequest,
  GetGoodArchivementsResponse,
  GoodArchivement
}