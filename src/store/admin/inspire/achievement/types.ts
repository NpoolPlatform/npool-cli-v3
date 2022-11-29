import { UserArchivement, BaseRequest } from '../../../base';

export interface GetUserGoodArchivementsRequest extends BaseRequest {
  UserIDs: Array<string>;
  Offset?: number;
  Limit?: number;
}

export interface GetUserGoodArchivementsResponse {
  Archivements: UserArchivement[];
  Total: number;
}
