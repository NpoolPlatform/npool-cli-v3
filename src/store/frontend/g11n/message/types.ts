import { MyRequest, Message } from '../../../base';


export interface GetMessagesRequest extends MyRequest {
  LangID: string;
  Disabled: boolean;
  Offset: number;
  Limit: number;
}

export interface GetMessagesResponse {
  Infos: Message[];
  Total: number;
}
