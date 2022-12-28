import { Message, BaseRequest, MyRequest } from '../../../base'

export interface CreateMessageRequest extends MyRequest {
  TargetLangID: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
}

export interface CreateMessageResponse {
  Info: Message;
}

export interface CreateMessagesRequest extends BaseRequest {
  Infos: Message[];
}

export interface CreateMessagesResponse {
  Infos: Message[];
}

export interface DeleteMessageRequest extends MyRequest {
  ID: string;
}

export interface DeleteMessageResponse {
  Info: Message;
}

export interface GetMessagesRequest extends MyRequest {
  Disabled: boolean;
  Offset: number;
  Limit: number;
}

export interface GetMessagesResponse {
  Infos: Message[];
  Total: number;
}

export interface UpdateMessageRequest extends MyRequest {
  ID: string;
  AppID?: string;
  LangID?: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
  Disabled: boolean;
}

export interface UpdateMessageResponse {
  Info: Message;
}
