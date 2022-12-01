import { UserArchivement, BaseRequest } from '../../../base';

export interface GetGoodArchivementsRequest extends BaseRequest {
  Offset?: number;
  Limit?: number;
}

export interface GetGoodArchivementsResponse {
  Archivements: UserArchivement[];
  Total: number;
}
