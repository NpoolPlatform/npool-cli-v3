import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { createAPI } from '../api'
import { useErrorSwitcherStore } from './local'
import { useNotificationStore } from './local/notifications'
import { ReqMessage, Notification } from './local/notifications/types'

const notification = useNotificationStore()
const errorswitcher = useErrorSwitcherStore()

function processError (err: AxiosError, message?: Notification) {
  console.log('axios error', err)

  if (message) {
    message.Description = err.message
  }

  for (const target of errorswitcher.ErrorTargets) {
    if (target.ErrorCode.toString() === err.code as string) {
      if (!errorswitcher.ErrorTrigger) {
        errorswitcher.ErrorTrigger = {
          ErrorCode: target.ErrorCode,
          Target: target.Target,
          Error: message
        }
      }
      return
    }
  }

  if (message) {
    notification.Notifications.push(message)
  }
}

function doAction<MyRequest, MyResponse> (
  url: string,
  req: MyRequest,
  message: ReqMessage,
  success: (resp: MyResponse) => void) {
  const api = createAPI() as AxiosInstance
  api
    .post<MyRequest, AxiosResponse<MyResponse>>(url, req)
    .then((response: AxiosResponse<MyResponse>) => {
      success(response.data)
      if (message.Info) {
        notification.Notifications.push(message.Info)
      }
    })
    .catch((err: AxiosError) => {
      processError(err, message.Error)
    })
}
function doActionWithError<MyRequest, MyResponse> (
  url: string,
  req: MyRequest,
  message: ReqMessage,
  success: (resp: MyResponse) => void,
  error: () => void) {
  const api = createAPI() as AxiosInstance
  api
    .post<MyRequest, AxiosResponse<MyResponse>>(url, req)
    .then((response: AxiosResponse<MyResponse>) => {
      success(response.data)
      if (message.Info) {
        notification.Notifications.push(message.Info)
      }
    })
    .catch((err: AxiosError) => {
      processError(err, message.Error)
      error()
    })
}

function doGet<MyRequest, MyResponse> (
  url: string,
  req: MyRequest,
  message: ReqMessage,
  success: (resp: MyResponse) => void) {
  const api = createAPI(undefined, undefined, true) as AxiosInstance
  api
    .get<MyRequest, AxiosResponse<MyResponse>>(url)
    .then((response: AxiosResponse<MyResponse>) => {
      success(response.data)
      if (message.Info) {
        notification.Notifications.push(message.Info)
      }
    })
    .catch((err: AxiosError) => {
      processError(err, message.Error)
    })
}

function doGetWithError<MyRequest, MyResponse> (
  url: string,
  req: MyRequest,
  message: ReqMessage,
  success: (resp: MyResponse) => void,
  error: () => void) {
  const api = createAPI(undefined, undefined, true) as AxiosInstance
  api
    .get<MyRequest, AxiosResponse<MyResponse>>(url)
    .then((response: AxiosResponse<MyResponse>) => {
      success(response.data)
      if (message.Info) {
        notification.Notifications.push(message.Info)
      }
    })
    .catch((err: AxiosError) => {
      processError(err, message.Error)
      error()
    })
}

export {
  doAction,
  doActionWithError,
  doGet,
  doGetWithError
}
