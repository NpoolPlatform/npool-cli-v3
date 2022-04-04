import axios, { AxiosInstance } from "axios"

class APIMeta {
  private static meta: APIMeta

  private baseURL: string
  private appID: string

  private constructor(baseURL?: string, appID?: string) {
    this.baseURL = baseURL ? baseURL : ''
    this.appID = appID ? appID : ''
  }
  public static new(baseURL?: string, appID?: string): APIMeta {
    if (!this.meta) {
      this.meta = new APIMeta(baseURL, appID)
      return this.meta
    }
    return this.meta
  }
  public getBaseURL(): string {
    return this.baseURL
  }
  public getAppID(): string {
    return this.appID
  }
}

const createAPI = (baseURL?: string, appID?: string): AxiosInstance | undefined => {
  const meta = APIMeta.new(baseURL, appID)
  if (meta.getBaseURL().length === 0 || meta.getAppID().length === 0) {
    return undefined
  }

  return axios.create({
    method: 'POST',
    baseURL: process.env.DEV ? '/api' : meta.getBaseURL(),
    headers: {
      'Content-Type': 'application/json',
      'X-App-ID': meta.getAppID()
    },
    withCredentials: true,
    responseType: 'json',
    timeout: 60000
  })
}

export {
  createAPI
}
