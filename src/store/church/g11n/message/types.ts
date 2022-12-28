import { BaseRequest, MyRequest, Message } from '../../../base'


export interface MessageReq {
  ID: string;
  AppID: string;
  LangID: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
  Disabled: boolean;
}

export interface CreateAppMessageRequest extends MyRequest {
  TargetAppID: string;
  TargetLangID: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
}

export interface CreateAppMessageResponse {
  Info: Message;
}

export interface CreateAppMessagesRequest extends BaseRequest {
  TargetAppID: string;
  TargetLangID: string;
  Infos: MessageReq[];
}

export interface CreateAppMessagesResponse {
  TargetAppID: string;
  TargetLangID: string;
  Infos: Message[];
}

export interface DeleteAppMessageRequest extends MyRequest {
  ID: string;
  TargetAppID: string;
}

export interface DeleteAppMessageResponse {
  Info: Message;
}

export interface GetAppMessagesRequest extends MyRequest {
  TargetAppID?: string;
  Disabled?: boolean;
  Offset: number;
  Limit: number;
}

export interface GetAppMessagesResponse {
  Infos: Message[];
  Total: number;
}

export interface UpdateAppMessageRequest extends MyRequest {
  TargetAppID: string;
  ID: string;
  MessageID: string;
  Message: string;
  GetIndex: number;
  Disabled: boolean;
}

export interface UpdateAppMessageResponse {
  Info: Message;
}
