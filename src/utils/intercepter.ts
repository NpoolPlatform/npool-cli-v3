import { AxiosInstance, AxiosResponse } from 'axios'
import { Cookies } from 'quasar'
import { useLoginedUserStore, LoginedResponse } from '../store/local'
import { useSettingStore } from '../store/local'
import { API as LoginedAPI } from '../store/frontend/appuser/user/const'
import {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import { createAPI } from '../api'

interface RouteMetaImpl {
  ShowHeaderAnnouncement: boolean
  ShowMainHeader: boolean
  ShowBigLogo: boolean
  ShowSignHelper: boolean
  ShowFooterTop: boolean
  ShowTopTip: boolean
  NeedLogined: boolean
}

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface RouteMeta extends RouteMetaImpl {
  }
}

const loginInterceptor = (signInPath: string, to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const setting = useSettingStore()
  setting.ShowHeaderAnnouncement = to.meta.ShowHeaderAnnouncement
  setting.ShowMainHeader = to.meta.ShowMainHeader
  setting.ShowBigLogo = to.meta.ShowBigLogo
  setting.ShowSignHelper = to.meta.ShowSignHelper
  setting.ShowFooterTop = to.meta.ShowFooterTop
  setting.ShowTopTip = to.meta.ShowTopTip

  const logined = useLoginedUserStore()
  if (logined.getLogined) {
    next()
    return
  }

  const userID = Cookies.get('X-User-ID')
  const token = Cookies.get('X-App-Login-Token')
  if (!userID || !token || userID.length === 0 || token.length === 0) {
    if (to.meta && to.meta.NeedLogined) {
      next({ path: signInPath, replace: true })
    } else {
      next()
    }
    return
  }

  const api = createAPI() as AxiosInstance

  const headers = api.defaults.headers as unknown as Record<string, string>
  headers['X-User-ID'] = userID
  headers['X-App-Login-Token'] = token

  api.post<unknown, AxiosResponse<LoginedResponse>>(LoginedAPI.LOGINED)
    .then((resp: AxiosResponse<LoginedResponse>) => {
      logined.LoginedUser = resp.data.Info
      if (!logined.LoginedUser && to.meta && to.meta.NeedLogined) {
        next({ path: signInPath, replace: true })
        return
      }
      next()
    }).catch(() => {
      if (to.meta && to.meta.NeedLogined) {
        next({ path: signInPath, replace: true })
      } else {
        next()
      }
    })
}

export {
  loginInterceptor,
  RouteMetaImpl
}
