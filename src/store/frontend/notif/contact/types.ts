import { UsedFor, BaseRequest } from '../../../base'

export interface ContactViaEmailRequest extends BaseRequest {
  UsedFor: UsedFor;
  Sender: string;
  Subject: string;
  Body: string;
  SenderName: string;
}

export interface ContactViaEmailResponse {

}