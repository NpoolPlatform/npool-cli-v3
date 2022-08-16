import { ReqMessage } from './local/notifications'

enum Op {
  EQ = 'eq',
  GT = 'gt',
  LT = 'lt',
  LIKE = 'like'
}

interface Cond {
  Op: Op;
  Val: any;
}

interface BaseRequest {
  Message: ReqMessage;
}

export {
  Op,
  Cond,
  BaseRequest
}
