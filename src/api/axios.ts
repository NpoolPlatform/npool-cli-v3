import axios, { AxiosInstance } from "axios"
import { Cookies } from "quasar"

const createAPI = (baseURL?: string, appID?: string): AxiosInstance | undefined => {
  if (baseURL) {
    Cookies.set('X-Base-URL', baseURL)
  }
  if (appID) {
    Cookies.set('X-App-ID', appID)
  }

  if (Cookies.get('X-Base-URL') || Cookies.get('X-Base-URL')?.length === 0 ||
      Cookies.get('X-App-ID') || Cookies.get('X-App-ID')?.length === 0) {
    return undefined
  }

  return axios.create({
    method: 'POST',
    baseURL: process.env.DEV ? '/api' : Cookies.get('X-Base-URL'),
    headers: {
      'Content-Type': 'application/json',
      'X-App-ID': Cookies.get('X-App-ID')
    },
    withCredentials: true,
    responseType: 'json',
    timeout: 60000
  })
}

export {
  createAPI
}
