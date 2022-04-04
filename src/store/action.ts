import { AxiosInstance, AxiosResponse } from 'axios'
import { createAPI } from '../api'
import { useNotificationStore } from './notifications'
import { ReqMessage } from './notifications/types'

const notification = useNotificationStore()

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
    .catch((err: Error) => {
      if (message.Error) {
        message.Error.Description = err.message
        notification.Notifications.push(message.Error)
      }
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
    .catch((err: Error) => {
      if (message.Error) {
        message.Error.Description = err.message
        notification.Notifications.push(message.Error)
      }
      error()
    })
}

export {
  doAction,
  doActionWithError
}
