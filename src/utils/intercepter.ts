import { AxiosInstance, AxiosResponse } from 'axios'
import { Cookies } from 'quasar'
import { useLoginedUserStore, LoginedResponse } from '../store/local'
import { useSettingStore } from '../store/local'
import { API as LoginedAPI } from '../store/frontend/users/const'
import {
  NavigationGuardNext,
  RouteLocationNormalized
} from 'vue-router'
import { createAPI } from '../api'
import { GetLangMessagesResponse, GetLangsResponse } from '../store/frontend/langs/types'
import { API as LangAPI } from '../store/frontend/langs/const'
import { useLocaleStore } from '../store/local/locale'

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

const langInterceptor = () => {
  const langID = Cookies.get('X-Lang-ID')
  if (!langID || langID.length === 0) {
    return
  }

  const api = createAPI() as AxiosInstance
  const headers = api.defaults.headers as unknown as Record<string, string>
  headers['X-Lang-ID'] = langID

  api.post<unknown, AxiosResponse<GetLangsResponse>>(LangAPI.GET_LANGS)
    .then((resp: AxiosResponse<GetLangsResponse>) => {
      const locale = useLocaleStore()
      locale.setLangs(resp.data.Infos)
      api.post<unknown, AxiosResponse<GetLangMessagesResponse>>(LangAPI.GET_LANG_MESSAGES)
      .then((resp: AxiosResponse<GetLangMessagesResponse>) => {
        locale.updateLocaleMessage(resp.data.Infos)
      }).catch(() => {
        // TODO
      })
    }).catch(() => {
      // TODO
    })
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
  langInterceptor,
  RouteMetaImpl
}
