import axios, { AxiosInstance } from "axios"
import { useMetaRepoStore } from "../store/metarepo"

const createAPI = (baseURL?: string, appID?: string): AxiosInstance | undefined => {
  const metarepo = useMetaRepoStore()
  if (baseURL) {
    metarepo.BaseURL = baseURL
  }
  if (appID) {
    metarepo.AppID = appID
  }

  if (metarepo.BaseURL.length === 0 || metarepo.AppID.length === 0) {
    return undefined
  }

  return axios.create({
    method: 'POST',
    baseURL: process.env.DEV ? '/api' : metarepo.BaseURL,
    headers: {
      'Content-Type': 'application/json',
      'X-App-ID': metarepo.AppID
    },
    withCredentials: true,
    responseType: 'json',
    timeout: 60000
  })
}

export {
  createAPI
}
